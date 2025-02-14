import { z } from "zod";
import { productSchema } from "./product/product.schema";

export const storeSchema: z.ZodSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  products: z.array(productSchema).optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type storeType = z.infer<typeof storeSchema>;
