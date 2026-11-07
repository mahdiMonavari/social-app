import z from "zod";

export const filters = z.object({
  gender: z.enum(["male", "female"]).optional().or(z.literal("")),
  orderBy: z.enum(["created", "updated"]).default("updated"),
  fromAge: z.coerce
    .number()
    .pipe(
      z
        .number()
        .min(7)
        .max(70)
        .transform((val) => val.toString()),
    )
    .catch("7"),
  toAge: z.coerce
    .number()
    .pipe(
      z
        .number()
        .min(7)
        .max(75)
        .transform((value) => value.toString()),
    )
    .catch("45"),
  page: z.coerce
    .number()
    .pipe(
      z
        .number()
        .min(1)
        .transform((v) => v.toString()),
    )
    .catch("1"),
});
