"use server";
import { Member } from "@/generated/prisma/client";
import { getCurrentUser, requiredUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import {
  editProfileSchema,
  EditProfileType,
} from "@/src/lib/schemas/editProfile";
import { ActionResult } from "@/src/lib/schemas/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

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

export const getMemberByUserId = cache((userId: string) => {
  try {
    // throw error;
    return prisma.member.findFirst({
      where: { userId },
    });
  } catch (error) {
    console.log(error);
    // throw error;
  }
});

export async function editUser(
  data: EditProfileType,
): Promise<ActionResult<Member>> {
  try {
    const user = await requiredUser();
    const parsed = editProfileSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues };
    }
    const { city, country, description, name } = parsed.data;
    const userUpdated = await prisma.member.update({
      where: { userId: user.id },
      data: {
        city,
        country,
        description,
        name,
        user: {
          update: {
            name,
          },
        },
      },
    });
    revalidatePath("/members");
    revalidatePath(`/members/${user.id}`);
    return { success: true, data: userUpdated };
  } catch (error) {
    if (error instanceof Error) return { success: false, error: error.message };
    else return { success: false, error: "Somting Went Wrong!" };
  }
}

export async function getImagesByUserId(userId: string) {
  const member = await prisma.member.findUnique({
    where: { userId },
    select: { photo: true },
  });
  return member?.photo;
}
