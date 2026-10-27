"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";

interface NavItem {
  key: string;
  label: string;
  icon: React.ElementType;
  badgeCount?: number;
}

const ITEMS: NavItem[] = [
  { key: "inbox", label: "Inbox", icon: GoInbox, badgeCount: 3 },
  { key: "outbox", label: "Outbox", icon: MdOutlineOutbox },
];

export default function MessageNav() {
  const searchParams = useSearchParams();
  const currentContainer = searchParams.get("container") ?? "inbox";

  return (
    <nav className="flex w-full gap-2 p-1.5 md:flex-col md:max-w-56 bg-slate-50/80 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-zinc-800">
      {ITEMS.map((item) => {
        const isActive = currentContainer === item.key;
        const Icon = item.icon;

        return (
          <Link
            key={item.key}
            href={`?container=${item.key}`}
            className={clsx(
              "group relative flex items-center justify-center md:justify-start gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none",
              {
                // حالت فعال (Active)
                "bg-white dark:bg-zinc-800 text-sky-600 dark:text-sky-400 shadow-xs shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-900/5 dark:ring-white/10 font-semibold":
                  isActive,
                // حالت غیرفعال (Inactive)
                "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-800/50":
                  !isActive,
              },
            )}
          >
            {/* آیکون */}
            <Icon
              className={clsx(
                "w-4 h-4 transition-transform duration-200 group-hover:scale-110",
                isActive
                  ? "text-sky-600 dark:text-sky-400"
                  : "text-slate-400 dark:text-zinc-500",
              )}
            />

            {/* عنوان */}
            <span className="truncate">{item.label}</span>

            {/* بج/کانتر اختیاری */}
            {typeof item.badgeCount === "number" && (
              <span
                className={clsx(
                  "ml-auto text-xs px-2 py-0.5 rounded-full font-mono transition-colors",
                  isActive
                    ? "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900"
                    : "bg-slate-200/70 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400",
                )}
              >
                {item.badgeCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
