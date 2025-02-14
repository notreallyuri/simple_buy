import { z } from "zod";
import { purchaseSchema } from "../purchase.schema";
import { productSchema } from "../../store/product/product.schema";

export const purchaseItemSchema: z.ZodSchema = z.object({
  id: z.number(),
  purchaseSchema: purchaseSchema,
  product: productSchema,
  productId: z.number(),
  purchaseId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type purchaseItemType = z.infer<typeof purchaseItemSchema>