import { prisma } from "./prisma";

export const createContext = async () => ({ prisma });

export type Context = Awaited<ReturnType<typeof createContext>>;