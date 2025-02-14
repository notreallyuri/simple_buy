import Fastify, { type FastifyRequest, type FastifyReply } from "fastify";

export const fastify = Fastify({ logger: true, maxParamLength: 5000 });
