import { useEffect } from "react";
import { usePreseceStor } from "./usePresenceStore";
import { getPusherClient } from "../pusher-js";
import { Members, PresenceChannel } from "pusher-js";

type PresenceMamer = {
  id: string;
  info: unknown;
};

function usePresece(userId: string | null) {
  const { add, remove, set } = usePreseceStor();
  useEffect(() => {
    if (!userId) return;
    const handleSetMembers = (memberIds: string[]) => set(memberIds);
    const handleAddMember = (id: string) => add(id);
    const handleRemoveMember = (id: string) => remove(id);
    const channel = getPusherClient().subscribe(
      "presence-nm",
    ) as PresenceChannel;
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      handleSetMembers(Object.keys(members.members));
    });
    channel.bind("pusher:member_added", (member: PresenceMamer) =>
      handleAddMember(member.id),
    );
    channel.bind("pusher:member_removed", (member: PresenceMamer) =>
      handleRemoveMember(member.id),
    );
    return () => {
      channel.unbind_all();
    };
  }, [add, remove, set, userId]);
}

export default usePresece;
