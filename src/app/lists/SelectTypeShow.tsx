"use client";
import { Tabs } from "@heroui/react";
import { TargetValue } from "./page";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { PiSpinnerGap } from "react-icons/pi";

export function SelectTypeShow() {
  const targetItems: TargetValue[] = ["mutual", "source", "target"];
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChangeRoute = (target: TargetValue) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("target", target);
      router.replace(`${pathName}?${params.toString()}`);
    });
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* کانتینر تب‌ها که هنگام لودینگ کم‌رنگ می‌شود */}
      <div
        className={`transition-opacity duration-200 w-full flex justify-center ${
          isPending ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <Tabs className="max-w-md flex-1">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              {targetItems.map((tab) => (
                <Tabs.Tab key={tab} onClick={() => handleChangeRoute(tab)}>
                  <span className="capitalize">{tab}</span>
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
      </div>

      {/* لودر مدرن و شناور در مرکز تب‌ها */}
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center z-10 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-background/80 dark:bg-default-100/10 backdrop-blur-md rounded-full shadow-sm border border-default-200/50">
            <PiSpinnerGap size={18} className="text-sky-500 animate-spin" />
            <span className="text-xs font-medium text-default-600">
              Changing...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
