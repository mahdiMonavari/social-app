import { z } from "zod";
export const chatSchema = z.object({
  text: z.string().min(1),
});
export type ChatType = z.infer<typeof chatSchema>;
