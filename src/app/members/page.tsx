import { getCurrentUser } from "@/src/lib/auth";
import { Surface } from "@heroui/react";

async function MembersPage() {
  const user = await getCurrentUser();
  return (
    <div>
      {user ? (
        <Surface className="p-3">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Surface>
      ) : (
        ""
      )}
    </div>
  );
}

export default MembersPage;
