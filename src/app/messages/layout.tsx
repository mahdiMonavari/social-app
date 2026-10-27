import {
  buttonVariants,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import SectionTitle from "./SectionTitle";
import MessageNav from "./MessageNav";

async function Layout(props: LayoutProps<"/messages">) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 w-full h-[calc(100vh-90px)] min-h-0">
      <aside className="hidden md:block md:col-span-1">
        <Card className="w-full h-full flex flex-col justify-between overflow-hidden shadow-sm">
          <CardContent>
            <MessageNav />
          </CardContent>
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

      <main className="col-span-1 md:col-span-3 flex flex-col h-full min-h-0 gap-2">
        <Card className="w-full h-full flex flex-col overflow-hidden shadow-sm p-3">
          <div className="flex md:hidden items-center justify-between p-3 pb-0 bg-clip-content gap-2">
            <div className="flex items-center gap-2 w-full">
              <MessageNav />
            </div>
            <Link
              href="/members"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              <FaArrowLeft />
            </Link>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="px-3 md:px-10 pt-0 md:pt-2 hidden md:block">
              <SectionTitle />
            </CardHeader>
            <Separator className="my-2" />

            {/* بخش محتوا که با flex-1 کل فضای ارتفاعیِ کارت را می‌کشد و در صورت زیاد شدن پیام‌ها اسکرول می‌خورد */}
            <CardContent className="flex-1 flex flex-col px-3 overflow-y-auto min-h-0">
              {props.children}
            </CardContent>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Layout;
