import { initTRPC } from "@trpc/server";
import { CTX } from "@acme/server";

const t = initTRPC.context<CTX>().create();

export const procedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;
