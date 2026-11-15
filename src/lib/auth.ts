import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await resend.emails.send({
        from: `SocialApp <${process.env.RESEND_FROM ?? "noreply@personalsocial.ir"}>`,
        to: user.email,
        subject: "verify your accunt",
        html: `<div style="font-family: sans-serif; direction: rtl;">
            <h2>wellcom ${user.name}!</h2>
            <p>for verify your accunt click on button</p>
            <a href="${url}" style="background: #0284c7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; display: inline-block;">verify accunt</a>
          </div>`,
      });
    },
  },
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      isOnboarded: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
    },
  },
});

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
};

export const requiredUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw Error("UNauthraiz");
  return session.user;
};
