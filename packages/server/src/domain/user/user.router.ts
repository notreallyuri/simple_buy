import { z } from "zod";
import { router, procedure, fastify } from "@acme/lib";
import { createUserSchema, updateUserSchema } from "@acme/schemas";
import { userService } from "./user.service";
import { prisma } from "@acme/lib";

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

  login: procedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        const hash = await Bun.password.hash(password);
        user = await prisma.user.create({
          data: {
            email,
            password: hash,
            username: email.split("@")[0], // For example, using the email as the username
            name: "Test User", // Or any other default name you want
            age: 30,
            bornAt: new Date("1990-01-01"),
          },
        });
      }

      const token = fastify.jwt.sign({ userId: user.id, email: user.email });

      ctx.res.setCookie("token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      });

      return { token, userId: user.id, email: user.email };
    }),
});
