import { Member } from "@/generated/prisma/client";
import { SelectTypeShow } from "./SelectTypeShow";
import {
  fetchMutualLike,
  fetchSourceLike,
  fetchTargetLike,
} from "../server/actions/likes";
import { requiredUser } from "@/src/lib/auth";
import MemberCard from "../members/MemberCard";

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
    <main className="mt-10">
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
        <div className="text-red-500">
          In This Fillter Member Dont Exist Yet
        </div>
      )}
    </main>
  );
}
