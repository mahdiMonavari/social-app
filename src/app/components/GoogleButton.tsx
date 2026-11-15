"use client";

import { authClient } from "@/src/lib/auth-client";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";

export function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/register/moreinfo",
    });
  };

  return (
    <Button
      onPress={handleGoogleSignIn}
      className="h-auto min-h-0 w-full bg-transparent p-0 data-[hover=true]:bg-transparent"
    >
      <span className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-2 text-[15px] font-medium text-neutral-800 shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-all duration-200 hover:-translate-y-px hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-[0_8px_20px_-12px_rgba(16,24,40,0.35)] active:translate-y-0 active:scale-[0.99]">
        <FcGoogle size={22} className="shrink-0" />
        <span>Continue with Google</span>
      </span>
    </Button>
  );
}
