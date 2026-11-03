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
            renderEmptyState={() => "No Message To Display"}
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
