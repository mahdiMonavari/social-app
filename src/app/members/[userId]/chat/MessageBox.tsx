"use client";
import { flatMessageType } from "@/src/lib/schemas/types";
import {
  formatShortDateTime,
  timeAgo,
  transformImageUrl,
} from "@/src/lib/utils";
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
  const { createdAt, dateRead, senderId, senderImg, senderName, text } =
    message;

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
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
              {dateRead && senderId === currentUser && (
                <span className="whitespace-nowrap text-[10px] text-black">
                  Read {timeAgo(dateRead)}
                </span>
              )}

              <div
                className={clsx(
                  "flex min-w-0 flex-wrap items-center gap-x-1 text-[10px] text-gray-700 md:text-xs",
                  { "ml-auto justify-end": senderId === currentUser },
                )}
              >
                <span className="max-w-25 text-[10px] truncate font-medium md:max-w-40">
                  {nameMassage}
                </span>
                <span className="whitespace-nowrap text-[8px] text-gray-500 md:text-xs">
                  {formatShortDateTime(new Date(createdAt))}
                </span>
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
