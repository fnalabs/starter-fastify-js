// imports
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'

import { HealthRouter, HelloRouter } from './routers'

export default function main (fastify) {
  fastify.register(cors)
  fastify.register(helmet)

  fastify.route(new HealthRouter())
  fastify.route(new HelloRouter())

  return fastify
}
