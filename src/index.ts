// imports
import type { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

import { HealthRouter, HelloRouter } from './routers/index.js'

export default async function main(
  fastify: FastifyInstance,
): Promise<FastifyInstance> {
  await fastify.register(cors)
  await fastify.register(helmet)

  fastify.route(new HealthRouter())
  fastify.route(new HelloRouter())

  return fastify
}
