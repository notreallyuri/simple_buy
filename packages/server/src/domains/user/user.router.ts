import z from "zod";
import { router, publicProcedure } from "@/libs/trpc";
import { userSchema } from "./user.schema";
import { userService } from "./user.service";

export const userRouter = router({
  create: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    const user = await userService.create(input);

    return {
      message: "✅ User created successfully!",
      userId: user.id,
    };
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const user = await userService.findById(input.id);

      if (!user) throw new Error("user not found");

      return { user };
    }),

  getAll: publicProcedure.query(async () => {
    const users = await userService.findAll();
    return { users };
  }),

  update: publicProcedure
    .input(z.object({ id: z.string().uuid(), data: userSchema.partial() }))
    .mutation(async ({ input }) => {
      const user = await userService.udpate(input.id, input.data);

      return {
        message: "✅ User updated successfully!",
        user,
      };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      await userService.delete(input.id);

      return {
        message: "✅ User deleted successfully!",
      };
    }),
});
