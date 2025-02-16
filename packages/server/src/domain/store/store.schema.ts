import { z } from "zod";

export const storeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  adminId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createStoreSchema = storeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateStoreSchema = storeSchema.partial().omit({
  id: true,
  createdAt: true,
});

export type StoreType = z.infer<typeof storeSchema>;
export type CreateStoreType = z.infer<typeof createStoreSchema>;
export type UpdateStoreType = z.infer<typeof updateStoreSchema>;
