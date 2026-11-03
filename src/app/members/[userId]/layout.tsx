import React, { ReactNode } from "react";
import { getMemberByUserId } from "../../server/actions/members";
import { notFound } from "next/navigation";
import {
  buttonVariants,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import MemberDrawer from "./MemberDrawer";
import { FaArrowLeft } from "react-icons/fa6";
import MemberNav from "./MemberNav";
import TitleSection from "./TitleSection";
import { requiredUser } from "@/src/lib/auth";
import { transformImageUrl } from "@/src/lib/utils";
import PresenceDot from "../../components/PresenceDot";

async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  const currentUser = await requiredUser();
  const isCurrentUser = currentUser.id === member?.userId;

  const currentYear = new Date().getFullYear();
  const memberAge = member.dateOfBirth
    ? currentYear - new Date(member.dateOfBirth).getFullYear()
    : null;

  return (
    <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 w-full h-[calc(100vh-90px)] min-h-0">
      <aside className="hidden md:block md:col-span-1">
        <Card className="w-full h-full flex flex-col justify-between overflow-hidden shadow-sm">
          <div>
            <div className="relative w-full aspect-square rounded-full overflow-hidden">
              <Image
                src={transformImageUrl(member?.img) || "/images/user.png"}
                alt={member.name || "Member profile"}
                fill
                sizes="25vw"
                priority
                className="object-cover p-5 rounded-full"
              />
            </div>

            <CardContent className="flex flex-col gap-2 items-center text-center p-2">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center justify-center gap-1">
                {member.name}
                {memberAge ? ` , ${memberAge}` : ""}
                <PresenceDot member={member} />
              </h2>

              {(member.city || member.country) && (
                <p className="text-sm text-default-500">
                  {[member.city, member.country].filter(Boolean).join(" , ")}
                </p>
              )}

              <Separator className="my-2" />

              <nav className="w-full text-sm">
                <MemberNav userId={userId} isCurrentUser={isCurrentUser} />
              </nav>
            </CardContent>
          </div>

          <CardFooter className="">
            <Link
              className={buttonVariants({
                variant: "secondary",
                className: "w-full gap-2",
              })}
              href="/members"
            >
              <FaArrowLeft />
              Go back
            </Link>
          </CardFooter>
        </Card>
      </aside>

      <main className="col-span-1 md:col-span-3 flex flex-col h-full min-h-0 gap-2">
        <Card className="w-full h-full flex flex-col overflow-hidden shadow-sm p-3">
          <div className="flex md:hidden items-center justify-between p-3 pb-0 bg-clip-content">
            <div className="flex items-center gap-2">
              <MemberDrawer member={member} isCurrentUser={isCurrentUser} />
              <span className="font-semibold text-sm truncate flex items-center gap-1">
                {member.name}
                <PresenceDot member={member} />
              </span>
            </div>
            <Link
              href="/members"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              <FaArrowLeft />
            </Link>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="px-3 md:px-10 pt-0 md:pt-2">
              <TitleSection name={member.name} isCurrentUser={isCurrentUser} />
            </CardHeader>
            <Separator className="my-2" />

            {/* بخش محتوا که با flex-1 کل فضای ارتفاعیِ کارت را می‌کشد و در صورت زیاد شدن پیام‌ها اسکرول می‌خورد */}
            <CardContent className="flex-1 flex flex-col px-3 overflow-y-auto min-h-0">
              {children}
            </CardContent>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Layout;
