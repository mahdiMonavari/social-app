"use client";
import { Photo, User } from "@/generated/prisma/client";
import Delete from "@/src/app/components/button/Delete";
import Star from "@/src/app/components/button/Star";
import { DeletePhoto, setMainImage } from "@/src/app/server/actions/members";
import { useTransition } from "react";
type Props = {
  isSelected: boolean;
  photo: Photo;
  user: User;
};

function PhotoButton({ isSelected, photo }: Props) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <div onClick={() => startTransition(async () => DeletePhoto(photo))}>
        <Delete disable={isSelected} loading={isPending} />
      </div>
      <div onClick={() => startTransition(async () => setMainImage(photo.url))}>
        <Star loading={isPending} isSelected={isSelected} />
      </div>
    </>
  );
}

export default PhotoButton;
