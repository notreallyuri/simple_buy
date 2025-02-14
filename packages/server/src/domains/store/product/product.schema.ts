import { z } from "zod";

export const productSchema = z.object({
  productId: z.number().optional(),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be positive"),
  storeId: z.string().uuid(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type productType = z.infer<typeof productSchema>;
