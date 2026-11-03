import { transformImageUrl } from "@/src/lib/utils";
import { toast } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export type LikeProps = {
  name: string;
  userId: string;
  image: string;
};

function likeToast({ image, name, userId }: LikeProps) {
  toast(
    <Link
      href={`/members/${userId}/profile`}
      className="font-semibold hover:underline"
    >
      {name} has liked you
    </Link>,
    {
      indicator: (
        <Image
          src={transformImageUrl(image) || ""}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      ),
      description: (
        <Link
          href={`/members/${userId}/profile`}
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

export default likeToast;
