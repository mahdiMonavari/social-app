"use client";

import { authClient } from "@/src/lib/auth-client";
import { Card, CardContent } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaHouseMedicalCircleCheck } from "react-icons/fa6";

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    const checkVerification = async () => {
      const { data } = await authClient.getSession();
      if (data?.user && data.user.emailVerified) {
        router.replace("/members");
      }
    };

    checkVerification();
    window.addEventListener("focus", checkVerification);
    return () => window.removeEventListener("focus", checkVerification);
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-md w-full p-4 text-center shadow-lg">
        <CardContent className="flex flex-col items-center gap-4">
          <div className="p-4 bg-sky-100 text-sky-600 rounded-full">
            <FaHouseMedicalCircleCheck size={48} />
          </div>
          <h2 className="text-xl font-bold">Verify Your Email</h2>
          <p className="text-sm text-gray-500">
            A verification link has been sent to your email. Once verified, this
            page will automatically update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
