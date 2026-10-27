"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import dynamic from "next/dynamic";

// ایمپورت داینامیک کامپوننت آپلود با غیرفعال کردن SSR
const PhotoUpload = dynamic(() => import("./photos/PhotoUpload"), {
  ssr: false,
});

type Segment = "profile" | "chat" | "photos";

const titles: Record<Segment, (name: string) => string> = {
  profile: (name) => `${name}'s Profile`,
  chat: (name) => `Chat With ${name}`,
  photos: (name) => `${name}'s Photos`,
};

function TitleSection({
  name,
  isCurrentUser,
}: {
  name: string;
  isCurrentUser: boolean;
}) {
  const raw = useSelectedLayoutSegment() ?? "profile";
  const segment: Segment = raw in titles ? (raw as Segment) : "profile";

  return (
    <div className="text-sky-700 lg:text-2xl font-bold flex items-center justify-between text-sm">
      {titles[segment](name)}
      {isCurrentUser && <PhotoUpload />}
    </div>
  );
}

export default TitleSection;
