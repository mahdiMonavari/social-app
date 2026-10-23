import Delete from "@/src/app/components/button/Delete";
import Star from "@/src/app/components/button/Star";
import { getImagesByUserId } from "@/src/app/server/actions/members";
import { requiredUser } from "@/src/lib/auth";
import { Button } from "@heroui/react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

async function page(props: PageProps<"/members/[userId]/photos">) {
  const currentUser = await requiredUser();
  const { userId } = await props.params;
  const photos = await getImagesByUserId(userId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {photos?.map((photo) => (
        <div
          key={photo.id}
          className="relative rounded-xl overflow-hidden aspect-square"
        >
          <Image
            src={photo.url}
            alt="user images"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
          />
          {currentUser.id === userId && (
            <div className="flex justify-between gap-2 items-center m-2 z-50">
              <Delete loading={false} />
              <Star loading={false} isSelected={false} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default page;
