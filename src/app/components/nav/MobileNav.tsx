"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

export default function MobileNav({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="contents lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex size-11 items-center justify-center rounded-xl text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {isOpen ? (
          <HiOutlineXMark aria-hidden="true" className="size-7" />
        ) : (
          <HiOutlineBars3 aria-hidden="true" className="size-7" />
        )}
      </button>

      <div
        id={menuId}
        inert={!isOpen}
        className={`col-span-2 grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a[href]")) {
            setIsOpen(false);
          }
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-3 max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-white/15 pt-3 pb-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
