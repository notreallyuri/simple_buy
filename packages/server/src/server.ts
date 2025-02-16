import { router } from "@acme/lib";
import { fastify } from "@acme/lib";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import type { FastifyRequest, FastifyReply } from "fastify";

import { userRouter } from "./domain/user/user.router";
import { storeRouter } from "./domain/store/store.router";
import jwt from "@fastify/jwt";

const appRouter = router({
  user: userRouter,
  store: storeRouter,
});

// Development
fastify.register(cors, { origin: "*" });
fastify.register(jwt, { secret: process.env.JWT_SECRET || "supersecret" });

fastify.decorate(
  "authenticate",
  async function (req: FastifyRequest, rep: FastifyReply) {
    try {
      await req.jwtVerify<{ userId: string; email: string }>();
    } catch (err) {
      rep.status(401).send({ error: "Unauthorized" });
    }
  }
);

await fastify.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter },
});

fastify.listen({ port: 3333 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Server running at http://localhost:3333");
});

export type AppRouter = typeof appRouter;
