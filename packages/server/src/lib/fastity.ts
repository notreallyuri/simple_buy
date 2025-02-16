import Fastify from "fastify";

export const fastify = Fastify({ logger: true, maxParamLength: 5000 });
