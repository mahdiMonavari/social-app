"use client";
import { getPusherClient } from "@/src/lib/pusher-js";
import { flatMessageType } from "@/src/lib/schemas/types";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { markMessagesAaRead } from "@/src/app/server/actions/message";
import { useMessageStore } from "@/src/lib/hooks/useMessageStore";
import ChatForm from "./ChatForm";
import { useParams } from "next/navigation";
import { Chip } from "@heroui/react";
import { User } from "better-auth";

type Props = {
  initialMessage: flatMessageType[];
  currentUser: User;
  chatId: string;
  readCount: number;
};

function MessageList({
  chatId,
  currentUser,
  initialMessage,
  readCount,
}: Props) {
  const [messages, setMessages] = useState(initialMessage);
  const channelRef = useRef<Channel | null>(null);
  const updateUnreadCount = useMessageStore((s) => s.updateUnReadMessageCount);
  const countUpdate = useRef(false);
  const { userId } = useParams<{ userId: string }>();
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [typingName, setTypingName] = useState("");
  const handleTyping = useCallback((name: string) => {
    setTypingName(name);
    setIsTyping(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  }, []);

  const handleNewMessage = useCallback(
    async (message: flatMessageType) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      if (message.senderId !== currentUser.id) {
        await markMessagesAaRead([message.id], message.senderId);
      }
    },
    [currentUser],
  );
  const handleSeenMessages = useCallback((messageIds: string[]) => {
    setMessages((prevState) =>
      prevState.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: new Date().toISOString() }
          : { ...message },
      ),
    );
  }, []);

  useEffect(() => {
    if (!countUpdate.current) {
      updateUnreadCount(-readCount);
      countUpdate.current = true;
    }
  }, [updateUnreadCount, readCount]);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = getPusherClient().subscribe(chatId);
      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("message:read", handleSeenMessages);
      channelRef.current.bind("client-typing", handleTyping);
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind_all();
        channelRef.current = null;
      }
    };
  }, [chatId, handleNewMessage, handleSeenMessages, handleTyping]);
  const triggerTyping = () => {
    if (channelRef.current) {
      channelRef.current.trigger("client-typing", currentUser.name);
    }
  };
  return (
    <>
      <div className="flex-1">
        {messages.length === 0 ? (
          <div className="flex h-full justify-center items-center text-sky-700">
            There is no message yet. Start conversation
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBox
              key={message.id}
              currentUser={currentUser.id}
              message={message}
              shouldShowAvatar={
                index === 0 ||
                messages[index].senderId !== messages[index - 1].senderId
              }
            />
          ))
        )}
      </div>
      <div className="relative">
        {isTyping && (
          <Chip
            color="accent"
            variant="secondary"
            className="rounded-md absolute bottom-full mb-3"
          >
            {typingName} is typing...
          </Chip>
        )}
        <ChatForm triggerTyping={triggerTyping} />
      </div>
    </>
  );
}

export default MessageList;
