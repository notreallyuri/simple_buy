import z from "zod";
import { router, publicProcedure } from "@/libs/trpc";
import { storeSchema } from "./store.schema";
import { storeService } from "./store.service";

export const storeRouter = router({
  create: publicProcedure.input(storeSchema).mutation(async ({ input }) => {
    const store = await storeService.create(input);

    return {
      message: "✅ Store created successfully",
      store,
    };
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const store = await storeService.findById(input.id);

      if (!store) throw new Error("Store not found");

      return { store };
    }),

  getAll: publicProcedure.query(async () => {
    const stores = await storeService.findAll();

    return { stores };
  }),

  update: publicProcedure
    .input(z.object({ id: z.string().uuid(), data: storeSchema }))
    .mutation(async ({ input }) => {
      const store = await storeService.update(input.id, input.data);

      return {
        message: "✅ Store updated successfully!",
        store,
      };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      await storeService.delete(input.id);

      return {
        message: "✅ Store deleted successfully!",
      };
    }),
});
