import { z } from "zod";
import { router, procedure, fastify } from "@acme/lib";
import { createUserSchema, updateUserSchema } from "@acme/schemas";
import { userService } from "@acme/services";
import fastifyCookie from "@fastify/cookie";
import { TRPCError } from "@trpc/server";
import { prisma } from "@acme/lib";

export const userRouter = router({
  create: procedure.input(createUserSchema).mutation(async ({ input, ctx }) => {
    const { email } = input;
    const { res } = ctx;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already in use",
      });

    try {
      const user = await userService.create(input);

      const token = fastify.jwt.sign({ email: input.email, userId: user.id });

      res.setCookie("authToken", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      });

      return { user };
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
    .mutation(async ({ input, ctx }) => {
      try {
        const { email, password } = input;
        const { res } = ctx;

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

        res.setCookie("authToken", token, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
        });

        return { userId: user.id, email: user.email };
      } catch (error) {
        console.error("Login error:", error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected error during login",
        });
      }
    }),
});
