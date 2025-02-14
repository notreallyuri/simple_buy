import { z } from "zod";
import { purchaseItemSchema } from "../../purchase/purchase_item/purchase_item.schema";

export const productSchema: z.ZodSchema = z.object({
  productId: z.number(),
  name: z.string(),
  price: z.number(),
  purchases: purchaseItemSchema.array(),
  store: z.string(),
  storeId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type productType = z.infer<typeof productSchema>;
