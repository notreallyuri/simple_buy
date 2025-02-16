import cors from "@fastify/cors";
import { fastify } from "@/libs/fastify";
import { router } from "@/libs/trpc";
import { userRouter } from "@/domains/user/user.router";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { createContext } from "@/libs/context";
import { storeRouter } from "./domains/store/store.router";

const appRouter = router({
  user: userRouter,
  store: storeRouter,
});

// Only development, if you plan to use this to build something
// change the origin for the love of god
await fastify.register(cors, { origin: "*" });

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

export type AppRouter = typeof appRouter;
