import { usePreseceStor } from "@/src/lib/hooks/usePresenceStore";
import { transformImageUrl } from "@/src/lib/utils";
import { Avatar, Badge, BadgeAnchor } from "@heroui/react";

type Props = {
  userId: string;
  src: string | null;
};

function PresenceAvatar({ src, userId }: Props) {
  const members = usePreseceStor((s) => s.members);
  const isActive = members.indexOf(userId) !== -1;
  return (
    <div>
      <BadgeAnchor>
        <Avatar>
          <Avatar.Image src={transformImageUrl(src) || "/images/user.png"} />
        </Avatar>
        {isActive && <Badge color="success" placement="top-right" size="sm" />}
      </BadgeAnchor>
    </div>
  );
}

export default PresenceAvatar;
