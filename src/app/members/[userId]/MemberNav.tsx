"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const links = [
  { path: "/", label: "Profile", segment: null },
  { path: "/chat", label: "Chat", segment: "chat" },
  { path: "/photos", label: "Photos", segment: "photos" },
];

function MemberNav({
  userId,
  isVertical,
  onNavigate,
}: {
  userId: string;
  isVertical?: boolean;
  onNavigate?: () => void;
}) {
  const active = useSelectedLayoutSegment();
  console.log(active);

  const baseUrl = `/members/${userId}`;
  return (
    <div
      className={` ${isVertical ? "flex items-center justify-between w-full" : "flex flex-col  gap-5"}`}
    >
      {links.map((link) => (
        <div
          key={link.path}
          className={`${active === link.segment ? "text-sky-700" : "text-gray-600/50 hover:text-gray-700/60 transition-all duration-300"}
          font-bold text-2xl`}
          onClick={onNavigate}
        >
          <Link href={`${baseUrl}/${link.path}`}>{link.label}</Link>
        </div>
      ))}
    </div>
  );
}

export default MemberNav;
