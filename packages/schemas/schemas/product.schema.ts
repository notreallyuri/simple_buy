import { z } from "zod";

export const productSchema = z.object({
  productId: z.number().int(),
  name: z.string().min(1),
  price: z.number().positive(),
  storeId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createProductSchema = productSchema.omit({
  productId: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = productSchema.partial().omit({
  productId: true,
  createdAt: true,
});

export type ProductType = z.infer<typeof productSchema>;
export type CreateProductType = z.infer<typeof createProductSchema>;
export type UpdateProductType = z.infer<typeof updateProductSchema>;
