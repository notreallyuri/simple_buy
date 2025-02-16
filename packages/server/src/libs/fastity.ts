import Fastify from "fastify";

export const f = Fastify({ logger: true, maxParamLength: 5000 });
