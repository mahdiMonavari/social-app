"use client";
import { Photo } from "@/generated/prisma/client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

type Props = {
  photo: Photo;
};

function PhotoCoponnet({ photo }: Props) {
  return (
    <>
      {photo.PublicId ? (
        <CldImage
          alt="member images"
          src={photo.PublicId}
          fill
          crop="fill"
          gravity="faces"
          className="object-cover rounded-lg"
        />
      ) : (
        <Image
          src={photo.url || "/images/user-placeholder.png"}
          alt="member's image"
          fill
          sizes="25vw"
          priority
          className="object-cover"
        />
      )}
    </>
  );
}

export default PhotoCoponnet;
