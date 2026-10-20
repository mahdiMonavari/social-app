"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerHeader,
  DrawerHandle,
  DrawerCloseTrigger,
  DrawerDialog,
  DrawerContent,
  DrawerHeading,
  DrawerBody,
  DrawerFooter,
  Separator,
} from "@heroui/react";
import Image from "next/image";
import MemberNav from "./MemberNav";
import { useState } from "react";

export interface MemberProfileProps {
  member: {
    id: string;
    name: string;
    img?: string | null;
    dateOfBirth?: Date | string | null;
    city?: string | null;
    country?: string | null;
    userId: string;
  };
}

export default function MemberDrawer({ member }: MemberProfileProps) {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = () => setIsOpen(false);
  return (
    <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger onClick={() => setIsOpen(true)}>
        <div className="relative w-10 rounded-full overflow-hidden aspect-square cursor-pointer">
          <Image
            src={member.img || "/images/user-placeholder.png"}
            alt={member.name || "Member profile"}
            fill
            sizes="10vw"
            priority
            className="object-cover"
          />
        </div>
      </DrawerTrigger>
      <DrawerBackdrop>
        <DrawerContent placement="bottom">
          <DrawerDialog>
            <DrawerCloseTrigger onClick={closeHandler} />
            <DrawerHandle />

            <DrawerHeader>
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={member.img || "/images/user-placeholder.png"}
                    alt={member.name || "Member profile"}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <DrawerHeading className="text-base font-semibold">
                    {member.name}
                  </DrawerHeading>
                  {(member.city || member.country) && (
                    <p className="text-sm text-muted-foreground">
                      {[member.city, member.country].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </DrawerHeader>

            <DrawerBody className="space-y-2 text-sm">
              {member.dateOfBirth && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Of Birth</span>
                  <span>
                    {new Date(member.dateOfBirth).toLocaleDateString("en")}
                  </span>
                </div>
              )}
              {member.city && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">City</span>
                  <span>{member.city}</span>
                </div>
              )}
              {member.country && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span>{member.country}</span>
                </div>
              )}
            </DrawerBody>
            <Separator className="my-2" />
            <DrawerFooter>
              <MemberNav
                userId={member.userId}
                isVertical={true}
                onNavigate={closeHandler}
              />
            </DrawerFooter>
          </DrawerDialog>
        </DrawerContent>
      </DrawerBackdrop>
    </Drawer>
  );
}
