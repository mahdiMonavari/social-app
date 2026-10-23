import { notFound } from "next/navigation";
import { getMemberByUserId } from "../../server/actions/members";
import { requiredUser } from "@/src/lib/auth";
import ProfileUser from "./ProfileUser";

export default async function MemberDetailedPage(
  props: PageProps<"/members/[userId]">,
) {
  const { userId } = await props.params;
  const member = await getMemberByUserId(userId);
  const currentUser = await requiredUser();

  const isCurrentUser = currentUser.id === member?.userId;

  if (!member) return notFound();

  return (
    <div className="flex-1">
      {isCurrentUser ? <ProfileUser member={member} /> : member.description}
    </div>
  );
}
