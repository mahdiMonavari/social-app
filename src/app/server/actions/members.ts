import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function getMembers() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  try {
    return prisma.member.findMany({ where: { NOT: { userId: user.id } } });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return prisma.member.findFirst({ where: { userId } });
  } catch (error) {
    console.log(error);
  }
}
