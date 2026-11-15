"use client";
import { flatMessageType } from "@/src/lib/schemas/types";
import { Button, Table, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../server/actions/message";
import PresenceAvatar from "../components/PresenceAvatar";
import { useMessageStore } from "@/src/lib/hooks/useMessageStore";
import { useShallow } from "zustand/shallow";
import { formatShortDateTime } from "@/src/lib/utils";
import { FaRegEnvelopeOpen } from "react-icons/fa";

type Props = {
  initialMessages: flatMessageType[];
  container: "inbox" | "outbox";
};

function MessagesTabel({ container, initialMessages }: Props) {
  const tabelTitle = container === "inbox" ? "Sender" : "Recipiant";
  const router = useRouter();
  const [isDeleting, startDeleting] = useTransition();
  const initMessages = useRef(initialMessages);
  const { set, messages, remove, updateUnreadCount } = useMessageStore(
    useShallow((state) => ({
      set: state.set,
      messages: state.messages,
      remove: state.remove,
      updateUnreadCount: state.updateUnReadMessageCount,
    })),
  );
  useEffect(() => {
    set(initMessages.current);
    return () => set([]);
  }, [set, container]);
  const deleteMessageHandler = (message: flatMessageType) => {
    startDeleting(async () => {
      const result = await deleteMessage(message.id, container === "outbox");
      if (!result.success) {
        toast.danger("Somthing Went Wrong");
      } else {
        remove(message.id);
        if (!message.dateRead && container === "inbox") {
          updateUnreadCount(-1);
        }
      }
    });
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="w-full">
          <Table.Header>
            <Table.Column isRowHeader>{tabelTitle}</Table.Column>
            <Table.Column>Message</Table.Column>
            <Table.Column>Date</Table.Column>
            <Table.Column>{""}</Table.Column>
          </Table.Header>
          <Table.Body
            items={messages}
            renderEmptyState={() => (
              <div className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center text-sky-50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 shadow-lg shadow-red-900/40">
                  <FaRegEnvelopeOpen className="text-xl text-red-400" />
                </div>

                <h4 className="bg-gradient-to-r from-red-500 to-sky-500 bg-clip-text font-serif text-lg font-light tracking-wide text-transparent">
                  No Messages Yet
                </h4>

                <div className="h-px w-12 bg-gradient-to-r from-transparent via-red-400 to-transparent" />

                <p className="max-w-xs text-sm leading-relaxed text-sky-100/70">
                  Your conversations will appear here once you start chatting.
                </p>
              </div>
            )}
          >
            {(message) => {
              const partyId =
                container === "outbox" ? message.recipientId : message.senderId;
              const image =
                container === "outbox"
                  ? message.recipientImg
                  : message.senderImg;
              const name =
                container === "outbox"
                  ? message.recipientName
                  : message.senderName;
              const isVisited = message.dateRead;
              return (
                <Table.Row
                  id={message.id}
                  onAction={() => router.push(`/members/${partyId}/chat`)}
                  className={`cursor-pointer ${isVisited ? "" : "font-bold"}`}
                >
                  <Table.Cell className="flex items-center gap-1">
                    <PresenceAvatar src={image} userId={partyId} />
                    {name}
                  </Table.Cell>
                  <Table.Cell>
                    <span className="line-clamp-1">{message.text}</span>
                  </Table.Cell>
                  <Table.Cell>
                    {formatShortDateTime(new Date(message.createdAt))}
                  </Table.Cell>
                  <Table.Cell>
                    <div onPointerDown={(e) => e.stopPropagation()}>
                      <Button
                        isIconOnly
                        variant="danger-soft"
                        aria-label="delete"
                        isPending={isDeleting}
                        onClick={() => deleteMessageHandler(message)}
                      >
                        <AiFillDelete size={18} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

export default MessagesTabel;
