import { initTRPC } from "@trpc/server";
import { type Context } from "./context";
import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof Error ? error.cause.message : null,
      },
    };
  },
});

export const router = t.router;
export const p = t.procedure;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;
