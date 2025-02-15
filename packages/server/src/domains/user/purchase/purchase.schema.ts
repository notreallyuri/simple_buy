import { z } from "zod";
import { userSchema } from "../user.schema";
import { purchaseItemSchema } from "./purchase_item/purchase_item.schema";
import { Prisma } from "@prisma/client";

export const purchaseSchema = z.object({
  purchaseId: z.string().uuid(),
  byUser: userSchema,
  userId: z.string(),
  createdAt: z.date(),
});

export const purchaseWithRelations = purchaseSchema.extend({
  PurchaseItems: z.array(purchaseItemSchema),
});

export type PurchaseType = z.infer<typeof purchaseSchema>;

export type PurchaseWithRelations = Omit<
  z.infer<typeof purchaseSchema>,
  "PurchaseItems"
> & {
  PurchaseItems: Prisma.PurchaseItemCreateNestedManyWithoutProductInput;
};
