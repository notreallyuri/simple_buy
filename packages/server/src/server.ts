import { router } from "@/lib/trpc";

import { fastify } from "@/lib/fastity";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

import { userRouter } from "./domain/user/user.router";
import { storeRouter } from "./domain/store/store.router";

const appRouter = router({
  user: userRouter,
  store: storeRouter,
});

// Development
fastify.register(cors, { origin: "*" });

await fastify.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter },
});

fastify.listen({ port: 3333 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Server running at http://localhost:3333")
});

export type AppRouter = typeof appRouter;
