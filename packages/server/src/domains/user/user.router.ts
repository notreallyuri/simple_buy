import z from "zod";
import { router, p } from "@/libs/trpc";
import { userSchema } from "./user.schema";
import { userService } from "./user.service";

export const userRouter = router({
  create: p.input(userSchema).mutation(async ({ input }) => {
    const user = await userService.create(input);

    return {
      message: "✅ User created successfully!",
      userId: user.id,
    };
  }),

  getById: p
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const user = await userService.findById(input.id);

      if (!user) throw new Error("user not found");

      return { user };
    }),

  getAll: p.query(async () => {
    const users = await userService.findAll();
    return { users };
  }),

  update: p
    .input(z.object({ id: z.string().uuid(), data: userSchema.partial() }))
    .mutation(async ({ input }) => {
      const user = await userService.update(input.id, input.data);

      return {
        message: "✅ User updated successfully!",
        user,
      };
    }),

  delete: p
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      await userService.delete(input.id);

      return {
        message: "✅ User deleted successfully!",
      };
    }),
});
