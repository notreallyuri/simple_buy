import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { prisma } from "./prisma";

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return {
    req,
    res,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
