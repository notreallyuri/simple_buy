import { z } from "zod";
import { router, procedure } from "@acme/lib";
import { createStoreSchema, updateStoreSchema } from "@acme/schemas";
import { storeService } from "@acme/services";

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
