"use server";
import { MessageWhereInput } from "@/generated/prisma/models";
import { requiredUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { pusherServer } from "@/src/lib/pusher";
import { chatSchema, ChatType } from "@/src/lib/schemas/chat";
import { ActionResult, flatMessageType } from "@/src/lib/schemas/types";
import { createChatId, flatMessageHandler } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";

export async function createMessage(
  recipientId: string,
  data: ChatType,
): Promise<ActionResult<flatMessageType>> {
  try {
    const user = await requiredUser();
    const parsed = chatSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      };
    }
    const rowMessage = await prisma.message.create({
      data: {
        text: data.text,
        recipientId,
        senderId: user.id,
      },
      select: selectItem,
    });
    const message = flatMessageHandler(rowMessage);
    await pusherServer.trigger(
      createChatId(user.id, recipientId),
      "message:new",
      message,
    );
    await pusherServer.trigger(
      `private-${recipientId}`,
      "message:new",
      message,
    );
    revalidatePath(`/members/${recipientId}/chat`);
    return { success: true, data: message };
  } catch (error) {
    if (error && error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: "Somthing Went Wrong",
    };
  }
}

export async function getMessages(recipientId: string) {
  try {
    const user = await requiredUser();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            recipientId,
            senderId: user.id,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: user.id,
            recipinetDeleted: false,
          },
        ],
      },
      orderBy: { createdAt: "asc" },
      select: selectItem,
    });
    let readCount = 0;
    if (messages.length > 0) {
      const readMessageIds = messages
        .filter(
          (message) =>
            message.recipient?.userId === user.id &&
            message.sender?.userId === recipientId &&
            message.dateRead === null,
        )
        .map((m) => m.id);
      await prisma.message.updateMany({
        where: { id: { in: readMessageIds } },
        data: {
          dateRead: new Date(),
        },
      });
      readCount = readMessageIds.length;
      await pusherServer.trigger(
        createChatId(recipientId, user.id),
        "message:read",
        readMessageIds,
      );
    }
    return {
      messages: messages.map((message) => flatMessageHandler(message)),
      readCount,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function markMessagesAaRead(
  messageIds: string[],
  senderId: string,
) {
  const user = await requiredUser();
  await prisma.message.updateMany({
    where: { id: { in: messageIds } },
    data: { dateRead: new Date() },
  });
  await pusherServer.trigger(
    createChatId(user.id, senderId),
    "message:read",
    messageIds,
  );
}

export async function getMessageFilterByContainer(container = "inbox") {
  const user = await requiredUser();
  const condition: MessageWhereInput = {
    [container === "inbox" ? "recipientId" : "senderId"]: user.id,
    ...(container !== "outbox"
      ? { recipinetDeleted: false }
      : { senderDeleted: false }),
  };
  const messages = prisma.message.findMany({
    where: condition,
    select: selectItem,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (await messages).map((message) => flatMessageHandler(message));
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const user = await requiredUser();
  const dataUpdate = !isOutbox
    ? { recipinetDeleted: true }
    : { senderDeleted: true };
  try {
    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: dataUpdate,
    });
    const messages = await prisma.message.findMany({
      where: {
        recipinetDeleted: true,
        senderDeleted: true,
      },
    });
    if (messages.length > 0) {
      await prisma.message.deleteMany({
        where: {
          id: {
            in: messages.map((message) => message.id),
          },
        },
      });
    }
    revalidatePath(`/members/${user.id}/chat`);
    revalidatePath(`messages`);
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

export async function getUnreadMessageCount() {
  try {
    const user = await requiredUser();
    return prisma.message.count({
      where: {
        recipientId: user.id,
        dateRead: null,
        recipinetDeleted: false,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const selectItem = {
  id: true,
  text: true,
  dateRead: true,
  createdAt: true,
  sender: {
    select: {
      userId: true,
      name: true,
      img: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      img: true,
    },
  },
};
