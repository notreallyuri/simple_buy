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


export type PurchaseType = z.infer<typeof purchaseSchema>
export type CreatePurchaseType = z.infer<typeof createPurchaseSchema>