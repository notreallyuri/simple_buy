import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";

const t = initTRPC.context<Context>().create();

const baseMiddleWare = t.middleware(async ({ ctx, next }) => {
  if (!ctx.prisma) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Database connection is not available",
    });
  }

  return next({
    ctx: {
      ...ctx,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure.use(baseMiddleWare);
