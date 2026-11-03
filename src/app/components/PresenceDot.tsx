"use client";
import { Member } from "@/generated/prisma/client";
import { usePreseceStor } from "@/src/lib/hooks/usePresenceStore";
import { GoDot, GoDotFill } from "react-icons/go";

type Props = {
  member: Member;
};

function PresenceDot({ member }: Props) {
  const members = usePreseceStor((state) => state.members);

  const isActive = members.indexOf(member.userId) !== -1;
  if (!isActive) return null;

  return (
    <div className="grid place-items-center size-9">
      <GoDot className="fill-white size-full col-start-1 row-start-1" />
      <GoDotFill
        size={32}
        className="fill-green-400 animate-pulse col-start-1 row-start-1"
      />
    </div>
  );
}

export default PresenceDot;
