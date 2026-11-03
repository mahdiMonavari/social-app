import { basicMessageType, flatMessageType } from "./schemas/types";
import { format, formatDistanceToNow } from "date-fns";

export function formatDateHandler(date: Date): string {
  return format(date, "dd MMM yyy h:mm:a");
}

export function flatMessageHandler(message: basicMessageType): flatMessageType {
  const { id, text, createdAt, dateRead, recipient, sender } = message;
  if (!recipient || !sender) {
    throw new Error("missing sender or recipinet");
  }
  return {
    id,
    text,
    createdAt: createdAt.toISOString(),
    dateRead: dateRead === null ? null : dateRead.toISOString(),
    recipientId: recipient.userId,
    recipientImg: recipient.img,
    recipientName: recipient.name,
    senderId: sender.userId,
    senderImg: sender.img,
    senderName: sender.name,
  };
}
export function transformImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return null;

  if (!imageUrl.includes("cloudinary")) return imageUrl;

  const uploadIndex = imageUrl.indexOf("/upload/") + "/upload/".length;

  const transformation = "c_fill,w_640,h_640,g_face/";

  return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(uploadIndex)}`;
}
export function createChatId(a: string, b: string) {
  return a > b ? `private-${b}-${a}` : `private-${a}-${b}`;
}

export function formatShortDateTime(date: Date) {
  return format(date, "dd MMM yy h:mm:a");
}
export function timeAgo(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
