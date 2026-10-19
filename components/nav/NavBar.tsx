import { buttonVariants } from "@heroui/styles";
import Link from "next/link";
import { GiMatchTip } from "react-icons/gi";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import { getCurrentUser } from "@/src/lib/auth";
import UserMenu from "./UserMenu";

function AuthLinks() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className={`${buttonVariants({ variant: "primary" })} min-h-11 flex-1 px-4 text-base lg:flex-none`}
      >
        login
      </Link>
      <Link
        href="/register"
        className={`${buttonVariants({ variant: "secondary" })} min-h-11 flex-1 px-4 text-base lg:flex-none`}
      >
        register
      </Link>
    </div>
  );
}

export default async function NavBar() {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 w-full bg-linear-to-r from-accent/85 to-black">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-3 px-3 py-3 sm:px-6 lg:flex lg:justify-between lg:gap-6 lg:px-10">
        <Link
          href="/"
          className="flex w-fit shrink-0 items-center gap-1.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:gap-3"
        >
          <GiMatchTip
            aria-hidden="true"
            className="size-7 shrink-0 text-gray-200 sm:size-10"
          />
          <span className="flex text-xl font-bold sm:text-3xl">
            <span className="text-gray-900">Social</span>
            <span className="text-gray-200">App</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-3 text-lg text-white uppercase lg:flex"
        >
          <NavLinks />
        </nav>
        <div className="hidden lg:block">
          {user ? <UserMenu user={user} /> : <AuthLinks />}
        </div>

        <MobileNav>
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 text-base text-white uppercase"
          >
            <NavLinks />
          </nav>
          <div className="mt-4 border-t border-white/15 pt-4">
            {user ? <UserMenu user={user} /> : <AuthLinks />}
          </div>
        </MobileNav>
      </div>
    </header>
  );
}
