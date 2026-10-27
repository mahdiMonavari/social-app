"use client";
import { authClient } from "@/src/lib/auth-client";
import { transformImageUrl } from "@/src/lib/utils";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  Label,
  Separator,
} from "@heroui/react";
import { User } from "better-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

type Props = {
  user: User;
};

function UserMenu({ user }: Props) {
  const router = useRouter();
  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar>
          <Avatar.Image
            alt={user.name}
            src={transformImageUrl(user.image) || "/images/user.png"}
          />
          <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </DropdownTrigger>
      <Dropdown.Popover>
        <Dropdown.Menu disabledKeys={["signed-in"]}>
          <Dropdown.Section>
            <Dropdown.Item id="signed-in">Sign In As {user.name}</Dropdown.Item>
          </Dropdown.Section>
          <Separator className="my-1" />
          <Dropdown.Section>
            <Dropdown.Item
              id="edit-profile"
              textValue="Edit Profile"
              render={(itemProps) => (
                <Link {...(itemProps as ComponentProps<typeof Link>)}></Link>
              )}
              href={`/members/${user.id}`}
            >
              <Label>Edit Profile</Label>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={onLogout}
              id="logout"
              textValue="Logout"
              variant="danger"
            >
              <Label>Logout</Label>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

export default UserMenu;
