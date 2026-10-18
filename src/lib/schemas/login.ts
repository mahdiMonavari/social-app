import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be as least 6 charecters"),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
