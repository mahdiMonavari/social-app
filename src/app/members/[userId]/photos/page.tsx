import { getImagesByUserId } from "@/src/app/server/actions/members";
import { getCurrentUser, requiredUser } from "@/src/lib/auth";
import PhotoButton from "./PhotoButton";
import PhotoCoponnet from "./Photo";

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
          <PhotoCoponnet photo={photo} />
          {currentUser.id === userId && (
            <div className="flex justify-between gap-2 items-center m-2 z-50">
              <PhotoButton
                isSelected={photo.url === currentUser.image}
                photo={photo}
                user={{
                  ...currentUser,
                  image: currentUser.image ?? null, // اگر undefined بود تبدیل به null می‌شود
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default page;
