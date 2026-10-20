"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export const navLinks = [
  { href: "/members", label: "Matches" },
  { href: "/lists", label: "Lists" },
  { href: "/messages", label: "Messages" },
];

function NavLinks() {
  const pathName = usePathname();

  return (
    <>
      {navLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${pathName.includes(item.href) ? "bg-white/30" : "hover:bg-white/10"} px-2 py-1 rounded-2xl`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export default NavLinks;
