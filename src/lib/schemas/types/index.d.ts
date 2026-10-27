import { Prisma } from "@/generated/prisma/client";
import { $ZodIssue } from "zod/v4/core";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string | $ZodIssue[] };

export type basicMessageType = Prisma.MessageGetPayload<{
  select: {
    id: true;
    text: true;
    dateRead: true;
    createdAt: true;
    sender: {
      select: {
        userId: true;
        name: true;
        img: true;
      };
    };
    recipient: {
      select: {
        userId: true;
        name: true;
        img: true;
      };
    };
  };
}>;

export type flatMessageType = {
  id: string;
  text: string;
  createdAt: string;
  dateRead: string | null;
  senderId: string;
  senderName: string;
  senderImg: string | null;
  recipientId: string;
  recipientName: string;
  recipientImg: string | null;
};
