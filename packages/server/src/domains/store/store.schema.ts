import { z } from "zod";
import { productSchema } from "./product/product.schema";

export const storeSchema: z.ZodSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  products: productSchema.array(),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type storeType = z.infer<typeof storeSchema>;
