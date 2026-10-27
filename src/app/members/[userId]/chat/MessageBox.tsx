"use client";
import { flatMessageType } from "@/src/lib/schemas/types";
import { transformImageUrl } from "@/src/lib/utils";
import { Avatar } from "@heroui/react";
import { clsx } from "clsx";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

type Props = {
  message: flatMessageType;
  currentUser: string;
  shouldShowAvatar: boolean;
};

function MessageBox({ currentUser, message, shouldShowAvatar }: Props) {
  const lastMessage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastMessage]);
  const {
    createdAt,
    dateRead,
    id,
    recipientId,
    recipientImg,
    recipientName,
    senderId,
    senderImg,
    senderName,
    text,
  } = message;

  const imageUrl = senderImg;
  const nameMassage = senderName;
  const AvatarImage = () => {
    if (shouldShowAvatar === false)
      return <div className="size-7 md:size-10"></div>;
    return (
      <Avatar className="size-7 md:size-10">
        <Avatar.Image
          alt={"user image"}
          src={transformImageUrl(imageUrl) || "/images/user.png"}
        />
        <Avatar.Fallback>{nameMassage.charAt(0)}</Avatar.Fallback>
      </Avatar>
    );
  };

  return (
    <div
      className={clsx("flex", {
        "justify-start": senderId !== currentUser,
        "justify-end": senderId === currentUser,
      })}
    >
      <div
        className={clsx("flex items-start gap-1 flex-1", {
          "flex-row-reverse": senderId === currentUser,
        })}
      >
        <div>{AvatarImage()}</div>
        <div
          className={clsx("p-2 mb-1 md:max-w-[50%] max-w-9/12", {
            "rounded-r-2xl bg-sky-100 text-white flex-1":
              senderId !== currentUser,
            "rounded-l-2xl bg-green-100 flex-1 border-gray-200":
              senderId === currentUser,
          })}
        >
          <div
            className={clsx({
              "text-end": senderId === currentUser,
            })}
          >
            <div className="flex justify-between">
              {dateRead && senderId === currentUser && (
                <span className="text-[10px] text-black">
                  Read at {format(dateRead, "dd MMM yyy h:mm:a")}
                </span>
              )}

              <div className="flex items-center gap-1 text-xs text-gray-700">
                <span>{nameMassage}</span>
                <span>{createdAt}</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900">{text}</p>
          </div>
        </div>
      </div>
      <div ref={lastMessage} />
    </div>
  );
}

export default MessageBox;
