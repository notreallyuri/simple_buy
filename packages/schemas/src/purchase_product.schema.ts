import { z } from "zod";

export const purchaseProductSchema = z.object({
  id: z.number().int(),
  productId: z.number().int(),
  purchaseId: z.string().uuid(),
  createdAt: z.coerce.date(),
});

export const createPurchaseProductSchema = purchaseProductSchema.omit({
  id: true,
  createdAt: true,
});

export type PurchaseProductType = z.infer<typeof purchaseProductSchema>;
export type CreatePurchaseProductType = z.infer<
  typeof createPurchaseProductSchema
>;
