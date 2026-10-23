import { $ZodIssue } from "zod/v4/core";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string | $ZodIssue[] };
