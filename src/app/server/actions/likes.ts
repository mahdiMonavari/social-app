"use server";
import { requiredUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { pusherServer } from "@/src/lib/pusher";
import { revalidatePath } from "next/cache";

export async function toggleLikeMember({
  targetUserId,
  isLike,
}: {
  isLike: boolean;
  targetUserId: string;
}) {
  try {
    const user = await requiredUser();
    if (user.id === targetUserId) {
      throw new Error("you can't like yourself");
    }
    if (isLike) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: { sourceUserId: user.id, targetUserId },
        },
      });
    } else {
      const like = await prisma.like.create({
        data: {
          sourceUserId: user.id,
          targetUserId,
        },
        select: {
          sourceMember: true,
        },
      });
      pusherServer.trigger(`private-${targetUserId}`, "like:new", {
        name: like.sourceMember.name,
        image: like.sourceMember.img,
        userId: like.sourceMember.userId,
      });
    }
    revalidatePath("/members");
    revalidatePath(`/members/${targetUserId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUsreLike() {
  try {
    const user = await requiredUser();
    const likes = await prisma.like.findMany({
      where: {
        sourceUserId: user.id,
      },
      select: {
        targetUserId: true,
      },
    });
    return likes.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchSourceLike(id: string) {
  try {
    const sourceLike = await prisma.like.findMany({
      where: {
        sourceUserId: id,
      },
      select: {
        targetMember: true,
      },
    });
    const targetMembes = sourceLike.map((x) => x.targetMember);
    return targetMembes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchTargetLike(id: string) {
  try {
    const targetLike = await prisma.like.findMany({
      where: {
        targetUserId: id,
      },
      select: {
        sourceMember: true,
      },
    });
    const sourceMembers = targetLike.map((x) => x.sourceMember);
    return sourceMembers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchMutualLike(id: string) {
  try {
    const mutualLikes = await prisma.like.findMany({
      where: {
        sourceUserId: id,
        targetMember: {
          sourceLike: {
            some: {
              targetUserId: id,
            },
          },
        },
      },
      select: {
        targetMember: true,
      },
    });
    return mutualLikes.map((x) => x.targetMember);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
