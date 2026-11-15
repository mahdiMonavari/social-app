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

export const profileSchema = z.object({
  gender: z.enum(["male", "female"], "you must check some one"),
  country: z.string().min(1, "pleas enter you country"),
  city: z.string().min(1, "pleas enter you city"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date")
    .refine((value) => {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      return age >= 7;
    }, `Your age must be at least 7 years`),
  description: z.string().min(5, "Enter something about yourself"),
});

export type Profile = z.infer<typeof profileSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
