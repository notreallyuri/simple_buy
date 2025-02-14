import { z } from "zod";
import { purchaseSchema } from "../purchase/purchase.schema";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  purchases: purchaseSchema.array(),

  name: z.string(),
  age: z.number(),
  phone: z.string(),
  bornAt: z.date(),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type userType = z.infer<typeof userSchema>;
