import { z } from "zod";
import { router, procedure, fastify } from "@acme/lib";
import { createUserSchema, updateUserSchema } from "@acme/schemas";
import { userService } from "@acme/services";
import { TRPCError } from "@trpc/server";
import { prisma } from "@acme/lib";

export const userRouter = router({
  create: procedure.input(createUserSchema).mutation(async ({ input }) => {
    const { email } = input;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already in use",
      });

    try {
      const user = await userService.create(input);

      const token = fastify.jwt.sign({ email: input.email, userId: user.id });

      return { user, token };
    } catch (error) {
      console.error("Failed to create user:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create user",
      });
    }
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

  login: procedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Wrong email",
          });
        }

        const isValid = await Bun.password.verify(password, user.password);
        if (!isValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Wrong password",
          });
        }

        const token = fastify.jwt.sign({ email: user.email });

        return { token, userId: user.id, email: user.email };
      } catch (error) {
        console.error("Login error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Login failed",
        });
      }
    }),
});
