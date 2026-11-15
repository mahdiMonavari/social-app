"use client";

import { Fragment } from "react";
import { Card, CardHeader } from "@heroui/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaCheck, FaEnvelopeOpen } from "react-icons/fa";
import { PiFileText } from "react-icons/pi";

const steps = [
  {
    id: 1,
    title: "Account",
    desc: "Email or quick login",
    pathName: "/baseinfo",
    icon: FaUser,
  },
  {
    id: 2,
    title: "Profile Details",
    desc: "Personal information",
    pathName: "/moreinfo",
    icon: PiFileText,
  },
  {
    id: 3,
    title: "Verify Email",
    desc: "check your email",
    pathName: "/verify",
    icon: FaEnvelopeOpen,
  },
];

function RegisterLayout({ children }: LayoutProps<"/register">) {
  const pathName = usePathname();
  console.log();

  const currentStep =
    steps.find((step) => pathName.includes(step.pathName))?.id || 1;
  const current = steps[currentStep - 1];
  const IconComponent = current.icon;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-116px)] pt-3">
      <Card className="w-full max-w-md shadow-xl border border-gray-800 bg-content1/60 backdrop-blur">
        <CardHeader className="flex flex-col items-center gap-2 pb-0">
          <div className="flex size-11 items-center justify-center rounded-xl bg-sky-700/15 text-sky-400 ring-1 ring-sky-700/40">
            <IconComponent size={18} />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
            <p className="text-xs text-foreground/60">Sign up a new account</p>
          </div>
        </CardHeader>

        <div className="flex items-center gap-2 px-6 pt-3 pb-1">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isDone = step.id < currentStep;
            return (
              <Fragment key={step.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-sky-700 text-white ring-2 ring-sky-700/20"
                        : isDone
                          ? "bg-sky-700/20 text-sky-400 border border-sky-700"
                          : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}
                  >
                    {isDone ? <FaCheck size={10} /> : step.id}
                  </div>
                  <div className="hidden sm:block leading-tight">
                    <p
                      className={`text-xs font-medium ${isActive ? "text-foreground" : "text-foreground/60"}`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <span
                    className={`h-px flex-1 transition-colors ${
                      step.id < currentStep ? "bg-sky-400" : "bg-gray-600"
                    }`}
                  />
                )}
              </Fragment>
            );
          })}
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="px-6 pt-2"
        >
          {children}
        </motion.div>
      </Card>
    </div>
  );
}

export default RegisterLayout;
