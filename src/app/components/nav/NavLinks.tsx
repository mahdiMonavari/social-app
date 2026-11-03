"use client";

import { useMessageStore } from "@/src/lib/hooks/useMessageStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const navLinks = [
  { href: "/members", label: "Matches" },
  { href: "/lists", label: "Lists" },
  { href: "/messages", label: "Messages" },
];

function NavLinks() {
  const pathName = usePathname();
  const unReadCount = useMessageStore((s) => s.unReadMessageCount);
  return (
    <>
      {navLinks.map((item) => {
        const isMessage = item.href === "/messages";
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${item.href.includes(pathName) ? "bg-white/30" : "hover:bg-white/10"} px-2 py-1 rounded-2xl relative flex items-center justify-between`}
          >
            {item.label}
            {isMessage && (
              <>
                <span className="absolute -right-2 -top-1 rounded-full  items-center justify-center size-5 bg-sky-700 text-white text-xs hidden md:flex">
                  {unReadCount}
                </span>
                <span className="rounded-full flex items-center justify-center size-5 bg-sky-700 text-white text-xs md:hidden">
                  {unReadCount}
                </span>
              </>
            )}
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
