import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "name is required"),
    email: z.email(),
    password: z.string().min(6, "Password must be as least 6 charecters"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "password and confirm password are not matched",
        path: ["confirmPassword"],
      });
    }
  });
export type RegisterSchemaType = z.infer<typeof registerSchema>;
