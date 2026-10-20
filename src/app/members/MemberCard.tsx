import { Member } from "@/generated/prisma/client";
import { Card, CardFooter } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  member: Member;
};
function MemberCard({ member }: Props) {
  const currentYear = new Date().getFullYear();
  return (
    <Link href={`/members/${member.userId}`}>
      <Card
        className="relative overflow-hidden aspect-[5/4] md:aspect-square
       rounded-2xl hover:scale-102 transition-all duration-300 hover:shadow-2xl"
      >
        <Image
          src={member.img || "/image"}
          alt={member.name}
          fill
          loading="eager"
          //   unoptimized
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
        />
        <CardFooter className="absolute bottom-0 left-0 right-0 py-2 px-1 bg-linear-to-b  to-black">
          <div className="flex flex-col text-white px-4">
            <span className="font-semibold">
              {member.name} , {currentYear - member.dateOfBirth.getFullYear()}
            </span>
            <span className="text-sm">{member.city}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default MemberCard;
