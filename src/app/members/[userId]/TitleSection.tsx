"use client";
import { useSelectedLayoutSegment } from "next/navigation";

type Segment = "profile" | "chat" | "photos";

const titles: Record<Segment, (name: string) => string> = {
  profile: (name) => `${name}'s Profile`,
  chat: (name) => `Chat With ${name}`,
  photos: (name) => `${name}'s Photos`,
};

function TitleSection({ name }: { name: string }) {
  const raw = useSelectedLayoutSegment() ?? "profile";
  const segment: Segment = raw in titles ? (raw as Segment) : "profile";

  return (
    <div className="text-sky-700 text-2xl font-bold">
      {titles[segment](name)}
    </div>
  );
}

export default TitleSection;
