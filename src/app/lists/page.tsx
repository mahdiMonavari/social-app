import { Member } from "@/generated/prisma/client";
import { SelectTypeShow } from "./SelectTypeShow";
import {
  fetchMutualLike,
  fetchSourceLike,
  fetchTargetLike,
} from "../server/actions/likes";
import { requiredUser } from "@/src/lib/auth";
import MemberCard from "../members/MemberCard";
import { FaUserSlash } from "react-icons/fa";

export type TargetValue = "target" | "source" | "mutual";

type Props = {
  searchParams: Promise<{
    target?: string;
  }>;
};

const fetchMethods = {
  source: fetchSourceLike,
  target: fetchTargetLike,
  mutual: fetchMutualLike,
} satisfies Record<TargetValue, (id: string) => Promise<Member[]>>;

export default async function ListsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  const target: TargetValue =
    resolvedParams.target && resolvedParams.target in fetchMethods
      ? (resolvedParams.target as TargetValue)
      : "target";
  const user = await requiredUser();
  const members = await fetchMethods[target](user.id);

  return (
    <main className="mt-10 container">
      <div className="flex items-center justify-center">
        <SelectTypeShow />
      </div>
      {members.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-10">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex w-full mt-5 flex-col items-center justify-center gap-5 rounded-3xl border border-sky-200/10 bg-gradient-to-b from-sky-900/40 to-sky-950/60 px-8 py-14 text-center text-sky-50 shadow-2xl shadow-sky-950/50 backdrop-blur-xl">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-sky-300/20 bg-sky-400/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-sky-400/10" />
              <FaUserSlash className="relative text-2xl text-sky-300" />
            </div>

            <h3 className="bg-gradient-to-r from-sky-200 via-white to-sky-300 bg-clip-text font-serif text-2xl font-light tracking-wide text-transparent">
              No Members Found
            </h3>

            <div className="h-px w-16 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

            <p className="max-w-sm text-sm leading-relaxed text-sky-100/70">
              No one matches this filter yet. Try adjusting your preferences and
              check back soon, new members are joining every day.
            </p>
          </div>
        </>
      )}
    </main>
  );
}
