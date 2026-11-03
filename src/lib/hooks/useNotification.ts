import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import { getPusherClient } from "../pusher-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useMessageStore } from "./useMessageStore";
import { flatMessageType } from "../schemas/types";
import messageToast from "@/src/app/components/MessageToast";
import likeToast, { LikeProps } from "@/src/app/components/LikeToast";

function useNotification(userId: string | null) {
  const channelRef = useRef<Channel | null>(null);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const add = useMessageStore((state) => state.add);
  const handleNewLike = useCallback(({ name, image, userId }: LikeProps) => {
    likeToast({ name, image, userId });
  }, []);
  const updateUnReadMessageCount = useMessageStore(
    (state) => state.updateUnReadMessageCount,
  );
  const handleNewMessage = useCallback(
    (message: flatMessageType) => {
      if (
        pathName === "/messages" &&
        searchParams.get("container") !== "outbox"
      ) {
        add(message);
        updateUnReadMessageCount(1);
      } else if (pathName !== `/members/${message.senderId}/chat`) {
        updateUnReadMessageCount(1);
        messageToast({ message });
      }
    },
    [pathName, searchParams, add, updateUnReadMessageCount],
  );
  useEffect(() => {
    if (!userId) return;
    if (!channelRef.current) {
      channelRef.current = getPusherClient().subscribe(`private-${userId}`);
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind_all();
        channelRef.current = null;
      }
    };
  }, [userId]);
  useEffect(() => {
    const channel = channelRef.current;
    if (!channel) return;
    channel.bind("message:new", handleNewMessage);
    channel.bind("like:new", handleNewLike);
    return () => {
      channel.unbind_all();
    };
  }, [handleNewMessage, handleNewLike]);
  return null;
}

export default useNotification;
