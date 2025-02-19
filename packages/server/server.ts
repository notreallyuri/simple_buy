import cors from "@fastify/cors";
import { router } from "@acme/lib";
import { fastify } from "@acme/lib";

import jwt from "@fastify/jwt";
import { fastifyCookie } from "@fastify/cookie";
import type { FastifyRequest, FastifyReply } from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

import { userRouter, storeRouter } from "@acme/routes";

const appRouter = router({
  user: userRouter,
  store: storeRouter,
});

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

const startServer = async () => {
  fastify.register(jwt, { secret: jwtSecret });
  console.log("✅ JWT Registered");

  fastify.register(cors, { origin: "*" });
  fastify.register(fastifyCookie, { secret: jwtSecret });

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

  const createContext = ({
    req,
    res,
  }: {
    req: FastifyRequest;
    res: FastifyReply;
  }) => {
    return { req, res };
  };

  await fastify.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext },
  });

  fastify.listen({ port: 3333 }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log("✅ Server running at http://localhost:3333");
  });
};

startServer();

export type AppRouter = typeof appRouter;
export type CTX = {
  req: FastifyRequest;
  res: FastifyReply;
};
