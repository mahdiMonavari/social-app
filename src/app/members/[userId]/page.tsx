import { notFound } from "next/navigation";
import { getMemberByUserId } from "../../server/actions/members";

export default async function MemberDetailedPage(
  props: PageProps<"/members/[userId]">,
) {
  const { userId } = await props.params;
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  return <div className="flex-1">MemberDetailedPage</div>;
}
