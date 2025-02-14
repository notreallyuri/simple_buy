import Fastify, { type FastifyRequest, type FastifyReply } from "fastify";

export const fastify = Fastify({ logger: true });

export type Request = FastifyRequest;
export type Reply = FastifyReply;
