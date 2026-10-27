"use client";
import { flatMessageType } from "@/src/lib/schemas/types";
import { transformImageUrl } from "@/src/lib/utils";
import { Avatar, Button, Table } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../server/actions/message";

type Props = {
  messages: flatMessageType[];
  container: "inbox" | "outbox";
};

function MessagesTabel({ container, messages }: Props) {
  const tabelTitle = container === "inbox" ? "Sender" : "Recipiant";
  const router = useRouter();
  const [isDeleting, startDeleting] = useTransition();
  const deleteMessageHandler = (messageId: string) => {
    startDeleting(async () => {
      await deleteMessage(messageId, container === "outbox");
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
                    <Avatar>
                      <Avatar.Image
                        alt={name}
                        src={transformImageUrl(image) || "/images/user.png"}
                      />
                      <Avatar.Fallback>{name.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                    {name}
                  </Table.Cell>
                  <Table.Cell>
                    <span className="line-clamp-1">{message.text}</span>
                  </Table.Cell>
                  <Table.Cell>{message.createdAt}</Table.Cell>
                  <Table.Cell>
                    <div onPointerDown={(e) => e.stopPropagation()}>
                      <Button
                        isIconOnly
                        variant="danger-soft"
                        aria-label="delete"
                        isPending={isDeleting}
                        onClick={() => deleteMessageHandler(message.id)}
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
