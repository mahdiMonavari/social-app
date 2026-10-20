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

  const currentYear = new Date().getFullYear();
  const memberAge = member.dateOfBirth
    ? currentYear - new Date(member.dateOfBirth).getFullYear()
    : null;

  return (
    <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 flex-1 w-full h-full min-h-0">
      {/* ۱. سایدبار دسکتاپ */}
      <aside className="hidden md:block md:col-span-1 h-full">
        <Card className="w-full h-full flex flex-col justify-between overflow-hidden shadow-sm">
          <div>
            <div className="relative w-full aspect-square rounded-full overflow-hidden">
              <Image
                src={member.img || "/images/user-placeholder.png"}
                alt={member.name || "Member profile"}
                fill
                sizes="25vw"
                priority
                className="object-cover p-5 rounded-full"
              />
            </div>

            <CardContent className="flex flex-col gap-3 items-center text-center p-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                {member.name}
                {memberAge ? ` , ${memberAge}` : ""}
              </h2>

              {(member.city || member.country) && (
                <p className="text-sm text-default-500">
                  {[member.city, member.country].filter(Boolean).join(" , ")}
                </p>
              )}

              <Separator className="my-2" />

              <nav className="w-full text-sm">
                <MemberNav userId={userId} />
              </nav>
            </CardContent>
          </div>

          <CardFooter className="p-4 pt-0">
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

      <main className="col-span-1 md:col-span-3 flex-1 flex flex-col h-full min-h-0 gap-2">
        <Card className="w-full flex-1 flex flex-col overflow-hidden shadow-sm p-0">
          <div className="flex md:hidden items-center justify-between p-3 pb-0 bg-clip-content">
            <div className="flex items-center gap-2">
              <MemberDrawer member={member} />
              <span className="font-semibold text-sm truncate">
                {member.name}
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
              TITLE
            </CardHeader>
            <Separator className="my-2" />
            <CardContent>{children}</CardContent>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Layout;
