import { getMembers } from "../server/actions/members";
import MemberCard from "./MemberCard";

async function MembersPage() {
  const members = await getMembers();
  if (!members) {
    return <div>dont exist user yet</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

export default MembersPage;
