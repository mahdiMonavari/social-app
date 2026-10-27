import { addImage } from "@/src/app/server/actions/members";
import { toast } from "@heroui/react";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

function PhotoUpload() {
  return (
    <CldUploadButton
      options={{
        maxFiles: 1,
        folder: "nm16-demo",
      }}
      onError={(error) => {
        if (error && typeof error === "object") {
          toast.danger(error.statusText);
        } else {
          toast.danger("Problem adding  image");
        }
      }}
      onSuccess={async (res) => {
        if (res.info && typeof res.info === "object") {
          const { url, public_id } = res.info;
          await addImage({ url, PublicId: public_id });
        }
      }}
      signatureEndpoint="/api/sign-image"
      className="flex items-center bg-accent text-white gap-0.5 md:gap-2 rounded-lg py-1 px-2 md:py-2 md:px-4 hover:bg-accent/70
      transition-all duration-300 cursor-pointer md:text-lg text-sm"
    >
      <HiPhoto />
      Upload Your Image
    </CldUploadButton>
  );
}

export default PhotoUpload;
