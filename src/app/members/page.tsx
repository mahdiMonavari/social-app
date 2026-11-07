import { toast } from "@heroui/react";
import { getMembers } from "../server/actions/members";
import Filters from "./Filters";
import MemberCard from "./MemberCard";
import { PaginationComponent } from "../components/PaginationComponnet";

async function MembersPage(props: PageProps<"/members">) {
  const searchqueris = await props.searchParams;
  const members = await getMembers(searchqueris);
  if (!members.data) {
    return <div>dont exist user yet</div>;
  }
  if (!members.success) {
    toast.danger(members.message);
  }
  return (
    <div className="flex flex-col justify-between gap-5 flex-1">
      <div className=" flex-1">
        <div className="md:block hidden">
          <Filters scope="desctope" count={members.items} />
        </div>
        <div className="flex items-center justify-center w-full md:hidden text-sky-700 text-2xl py-2">
          Result : {members.items}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {members.data &&
            members.data.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
        </div>
      </div>
      <div>
        {members.perPage && members.page && members.items && (
          <PaginationComponent
            pages={members.page}
            items={members.items}
            perPage={members.perPage}
          />
        )}
      </div>
    </div>
  );
}

export default MembersPage;
