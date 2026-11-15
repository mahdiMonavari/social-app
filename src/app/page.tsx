import Link from "next/link";
import { FaComments, FaUserFriends } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

export default function StartJourney() {
  return (
    <section className="relative flex h-screen max-h-[100vh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-sky-700 px-6 text-sky-50 -mt-16">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-sky-300/10 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6 text-center sm:gap-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-sky-200 backdrop-blur-md">
          <HiSparkles className="text-sky-300" />
          Premium Social
        </span>

        <h1 className="bg-gradient-to-b from-white to-sky-200 bg-clip-text font-serif text-5xl font-light leading-tight tracking-wide text-transparent sm:text-7xl lg:text-8xl">
          Start Journey
        </h1>

        <div className="h-px w-24 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

        <p className="max-w-xl text-sm leading-relaxed text-sky-100/80 sm:text-base">
          An elegant app to chat and meet new friends. Connect instantly with
          people who share your interests, have meaningful conversations, and
          build relationships that matter.
        </p>

        <div className="flex items-center gap-6 text-sky-200/70">
          <FaComments className="text-2xl transition hover:text-sky-100" />
          <FaUserFriends className="text-2xl transition hover:text-sky-100" />
        </div>

        <Link
          href={"/register"}
          className="group mt-2 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-300 to-sky-500 px-8 py-3.5 text-sm font-semibold text-sky-950 shadow-lg shadow-sky-500/30 transition hover:scale-105 hover:shadow-sky-400/50 active:scale-95"
        >
          Get Started
          <span className="transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
