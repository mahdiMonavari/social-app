"use server";
import { Member, Photo } from "@/generated/prisma/client";
import { getCurrentUser, requiredUser } from "@/src/lib/auth";
import { cloudinary } from "@/src/lib/cloudinary";
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
export async function addImage({
  PublicId,
  url,
}: {
  url: string;
  PublicId: string;
}) {
  try {
    const user = await requiredUser();
    const member = await prisma.member.update({
      where: { userId: user.id },
      data: {
        photo: {
          create: {
            url,
            PublicId,
          },
        },
      },
    });
    revalidatePath(`/members/${member.userId}/photos`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setMainImage(url: string) {
  try {
    const currentUser = await requiredUser();
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        image: url,
        member: {
          update: {
            img: url,
          },
        },
      },
    });
    revalidatePath(`/members/${currentUser.id}/photos`);
    revalidatePath(`/members`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function DeletePhoto(photo: Photo) {
  try {
    const currentUser = await requiredUser();
    if (currentUser.image !== photo.url && photo.PublicId) {
      await cloudinary.v2.uploader.destroy(photo.PublicId);
      await prisma.member.update({
        where: { userId: currentUser.id },
        data: {
          photo: {
            delete: { id: photo.id },
          },
        },
      });
    } else throw "You Cannot Delete Your Profile Image";
    revalidatePath(`/members/${currentUser.id}/photos`);
    revalidatePath(`/members`);
  } catch (error) {
    console.log(error);
  }
}
