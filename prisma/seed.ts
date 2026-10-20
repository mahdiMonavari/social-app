import { prisma } from "@/src/lib/prisma";
import { membersData } from "./membersData";
import { auth } from "@/src/lib/auth";

const seedUser = async () => {
  for (const member of membersData) {
    const {
      city,
      country,
      created,
      dateOfBirth,
      description,
      email,
      gender,
      image,
      lastActive,
      name,
      username,
    } = member;
    const result = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password: "12345678",
        image,
      },
    });
    await prisma.user.update({
      where: { id: result.user.id },
      data: {
        emailVerified: true,
        member: {
          create: {
            city,
            country,
            dateOfBirth: new Date(dateOfBirth),
            description,
            gender,
            name,
            img: image,
            created: new Date(created),
            updated: new Date(lastActive),
            photo: { create: { url: image } },
          },
        },
      },
    });
  }
};

async function main() {
  await seedUser();
}
main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(async () => prisma.$disconnect());
