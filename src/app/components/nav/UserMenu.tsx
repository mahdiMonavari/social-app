"use client";
import { authClient } from "@/src/lib/auth-client";
import { Avatar, Dropdown, DropdownTrigger, Label } from "@heroui/react";
import { User } from "better-auth";
import { useRouter } from "next/navigation";

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
            src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
          />
          <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </DropdownTrigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="edit-profile" textValue="Edit Profile">
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
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

export default UserMenu;
