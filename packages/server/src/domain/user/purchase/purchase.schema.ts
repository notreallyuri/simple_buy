import { z } from "zod";

export const purchaseSchema = z.object({
  purchaseId: z.number(),
  userId: z.string().uuid(),
  createdAt: z.coerce.date(),
});

export const createPurchaseSchema = purchaseSchema.omit({
  purchaseId: true,
  createdAt: true,
});
