"use server";
import { Message } from "@/generated/prisma/client";
import { MessageWhereInput } from "@/generated/prisma/models";
import { requiredUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { chatSchema, ChatType } from "@/src/lib/schemas/chat";
import { ActionResult } from "@/src/lib/schemas/types";
import { flatMessageHandler } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";

export async function createMessage(
  recipientId: string,
  data: ChatType,
): Promise<ActionResult<Message>> {
  try {
    const user = await requiredUser();
    const parsed = chatSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      };
    }
    const message = await prisma.message.create({
      data: {
        text: data.text,
        recipientId,
        senderId: user.id,
      },
    });
    return { success: true, data: message };
  } catch (error) {
    if (error && error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    revalidatePath(`/members/${recipientId}/chat`);
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
    if (messages.length > 0) {
      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: user.id,
          dateRead: null,
        },
        data: {
          dateRead: new Date(),
        },
      });
    }
    return messages.map((message) => flatMessageHandler(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
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
