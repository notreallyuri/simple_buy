import { z } from "zod";
import { router, procedure } from "@/lib/trpc";
import { createUserSchema, updateUserSchema } from "./user.schema";
import { userService } from "./user.service";

export const userRouter = router({
  create: procedure.input(createUserSchema).mutation(async ({ input }) => {
    return await userService.create(input);
  }),

  update: procedure
    .input(updateUserSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await userService.update(id, data);
    }),

  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await userService.delete(input.id);
    }),

  getAll: procedure.query(async () => {
    return await userService.getAll();
  }),

  getById: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await userService.getByID(input.id);
    }),
});
