import { z } from "zod";
import { router, procedure } from "@/lib/trpc";
import { createStoreSchema, updateStoreSchema } from "./store.schema";
import { storeService } from "./store.service";

export const storeRouter = router({
  create: procedure.input(createStoreSchema).mutation(async ({ input }) => {
    return await storeService.create(input);
  }),

  update: procedure
    .input(updateStoreSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      return await storeService.update(id, data);
    }),

  delete: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await storeService.delete(input.id);
    }),

  getAll: procedure.query(async () => {
    return await storeService.getAll();
  }),

  getById: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await storeService.getByID(input.id);
    }),
});
