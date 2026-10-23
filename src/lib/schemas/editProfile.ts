import z from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1, "name is requaier"),
  description: z.string().min(1, "description is requaier"),
  city: z.string().min(1, "city is requaier"),
  country: z.string().min(1, "country is requaier"),
});

export type EditProfileType = z.infer<typeof editProfileSchema>;
