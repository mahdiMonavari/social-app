import { flatMessageType } from "@/src/lib/schemas/types";
import { transformImageUrl } from "@/src/lib/utils";
import { toast } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

function messageToast({ message }: { message: flatMessageType }) {
  toast(
    <Link
      href={`/members/${message.senderId}/chat`}
      className="font-semibold hover:underline"
    >
      {message.senderName} sent you a message
    </Link>,
    {
      indicator: (
        <Image
          src={transformImageUrl(message.senderImg) || ""}
          alt={message.senderName}
          height={40}
          width={40}
          className="rounded-full object-cover"
        />
      ),
      description: (
        <Link
          href={`/members/${message.senderId}/chat`}
          className="font-semibold hover:underline"
        >
          Click To View
        </Link>
      ),
      variant: "accent",
      timeout: 5000,
    },
  );
}

export default messageToast;
