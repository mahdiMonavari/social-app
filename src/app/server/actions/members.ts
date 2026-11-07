"use server";
import { Member, Photo } from "@/generated/prisma/client";
import { getCurrentUser, requiredUser } from "@/src/lib/auth";
import { cloudinary } from "@/src/lib/cloudinary";
import { prisma } from "@/src/lib/prisma";
import {
  editProfileSchema,
  EditProfileType,
} from "@/src/lib/schemas/editProfile";
import { filters } from "@/src/lib/schemas/filter";
import { ActionResult } from "@/src/lib/schemas/types";
import { revalidatePath } from "next/cache";
import { SearchParams } from "next/dist/server/request/search-params";
import { cache } from "react";
const ITEM_PERPAGE = 3;

export async function getMembers(queries: SearchParams): Promise<{
  success: boolean;
  data?: Member[];
  message?: string;
  page?: number;
  items?: number;
  perPage?: number;
}> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "Unauthraized" };
  }
  try {
    const parsed = filters.safeParse(queries);
    if (!parsed.success) {
      const [data, totalItems] = await Promise.all([
        prisma.member.findMany({
          where: { NOT: { userId: user.id } },
          skip: 0,
          take: ITEM_PERPAGE,
        }),
        prisma.member.count({
          where: { NOT: { userId: user.id } },
        }),
      ]);
      return {
        data,
        success: false,
        message: "your filters has wrong",
        items: totalItems,
        page: Math.ceil(totalItems / ITEM_PERPAGE),
        perPage: ITEM_PERPAGE,
      };
    }
    const { gender, orderBy, fromAge, toAge, page } = parsed.data;
    console.log(ITEM_PERPAGE);

    const currentYear = new Date().getFullYear();
    const fromDate = new Date(currentYear - Number(fromAge), 1, 1);
    const toDate = new Date(currentYear - Number(toAge), 1, 1);

    const [data, totalItems] = await Promise.all([
      prisma.member.findMany({
        where: {
          NOT: { userId: user.id },
          ...(gender && { gender }),
          dateOfBirth: { gte: toDate, lte: fromDate },
        },
        orderBy: {
          ...(orderBy && { [orderBy]: "desc" }),
        },
        skip: (Number(page) - 1) * ITEM_PERPAGE,
        take: ITEM_PERPAGE,
      }),
      prisma.member.count({
        where: {
          NOT: { userId: user.id },
          ...(gender && { gender }),
          dateOfBirth: { gte: toDate, lte: fromDate },
        },
      }),
    ]);
    return {
      data,
      success: true,
      items: totalItems,
      page: Math.ceil(totalItems / ITEM_PERPAGE),
      perPage: ITEM_PERPAGE,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "sever side error",
    };
  }
}

export const getMemberByUserId = cache((userId: string) => {
  try {
    return prisma.member.findFirst({
      where: { userId },
    });
  } catch (error) {
    console.log(error);
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

export async function updateLastActive() {
  const user = await requiredUser();
  prisma.member
    .update({
      where: {
        userId: user.id,
      },
      data: {
        updated: new Date(),
      },
    })
    .catch((e) => console.log(e));
}
