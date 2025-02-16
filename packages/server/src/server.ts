import { router } from "@/lib/trpc";
import { fastify } from "@/lib/fastity";
import { userRouter } from "./domain/user/user.router";
import { storeRouter } from "./domain/store/store.router";

const appRouter = router({
  user: userRouter,
  store: storeRouter,
});

export type AppRouter = typeof appRouter;
