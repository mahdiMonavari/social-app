import { Channel } from "pusher-js";
import { useEffect, useRef } from "react";
import { getPusherClient } from "../pusher-js";
import { usePathname, useSearchParams } from "next/navigation";
import { useMessageStore } from "./useMessageStore";
import { flatMessageType } from "../schemas/types";
import messageToast from "@/src/app/components/MessageToast";
import showLikeToast, { LikeProps } from "@/src/app/components/LikeToast";

function useNotification(userId: string | null) {
  const channelRef = useRef<Channel | null>(null);
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const add = useMessageStore((state) => state.add);
  const updateUnReadMessageCount = useMessageStore(
    (state) => state.updateUnReadMessageCount,
  );

  // نگه داشتن آخرین مقادیر برای جلوگیری از ساخت مجدد لیسنرها
  const stateRef = useRef({
    pathName,
    searchParams,
    add,
    updateUnReadMessageCount,
  });
  useEffect(() => {
    stateRef.current = {
      pathName,
      searchParams,
      add,
      updateUnReadMessageCount,
    };
  });

  useEffect(() => {
    if (!userId) return;

    const pusher = getPusherClient();
    const channel = pusher.subscribe(`private-${userId}`);
    channelRef.current = channel;

    const handleNewLike = ({ name, image, userId }: LikeProps) => {
      showLikeToast({ name, image, userId });
    };

    const handleNewMessage = (message: flatMessageType) => {
      const {
        pathName: currentPath,
        searchParams: currentParams,
        add: addMsg,
        updateUnReadMessageCount: updateCount,
      } = stateRef.current;

      if (
        currentPath === "/messages" &&
        currentParams.get("container") !== "outbox"
      ) {
        addMsg(message);
        updateCount(1);
      } else if (currentPath !== `/members/${message.senderId}/chat`) {
        updateCount(1);
        messageToast({ message });
      }
    };

    channel.bind("message:new", handleNewMessage);
    channel.bind("like:new", handleNewLike);

    return () => {
      channel.unbind("message:new", handleNewMessage);
      channel.unbind("like:new", handleNewLike);
      pusher.unsubscribe(`private-${userId}`);
      channelRef.current = null;
    };
  }, [userId]);

  return null;
}

export default useNotification;
