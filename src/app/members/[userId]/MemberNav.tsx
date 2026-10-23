"use client";

import { requiredUser } from "@/src/lib/auth";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export type Segments = "chat" | "photos" | null;

type NavLink = {
  path: string;
  label: string;
  segment: Segments;
};

const links: NavLink[] = [
  { path: "/", label: "Profile", segment: null },
  { path: "/chat", label: "Chat", segment: "chat" },
  { path: "/photos", label: "Photos", segment: "photos" },
];

function MemberNav({
  userId,
  isVertical,
  onNavigate,
  isCurrentUser,
}: {
  userId: string;
  isVertical?: boolean;
  onNavigate?: () => void;
  isCurrentUser: boolean;
}) {
  const active = useSelectedLayoutSegment();

  const baseUrl = `/members/${userId}`;
  return (
    <div
      className={` ${isVertical ? "flex items-center justify-between w-full" : "flex flex-col  gap-5"}`}
    >
      {links.map((link) => {
        return isCurrentUser && link.label === "Chat" ? (
          ""
        ) : (
          <div
            key={link.path}
            className={`${active === link.segment ? "text-sky-700" : "text-gray-600/50 hover:text-gray-700/60 transition-all duration-300"}
          font-bold text-2xl`}
            onClick={onNavigate}
          >
            <Link href={`${baseUrl}/${link.path}`}>{link.label}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default MemberNav;
