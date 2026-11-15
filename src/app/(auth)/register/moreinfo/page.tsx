import { getCurrentUser } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import MoreInfoForm from "./MoreInfoForm";

async function page() {
  const user = await getCurrentUser();
  if (!user) redirect("/register/baseinfo");

  return (
    <div>
      <MoreInfoForm />
    </div>
  );
}

export default page;
