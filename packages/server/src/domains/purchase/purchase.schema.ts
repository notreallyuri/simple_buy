import { z } from "zod";
import { userSchema } from "../user/user.schema";
import { purchaseItemSchema } from "./purchase_item/purchase_item.schema";

export const purchaseSchema: z.ZodSchema = z.object({
  purchaseId: z.string().uuid(),
  byUser: userSchema,
  userId: z.string(),
  purchaseItems: purchaseItemSchema.array(),
  createdAt: z.date(),
});

export type purchaseType = z.infer<typeof purchaseSchema>;
