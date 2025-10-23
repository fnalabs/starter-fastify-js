import type {
  FastifyRequest,
  RouteGenericInterface,
  RouteHandlerMethod,
  RouteOptions,
} from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'

export type CustomRequest<RequestGeneric extends RouteGenericInterface> =
  FastifyRequest<RequestGeneric>
export type CustomRequestHandler<RequestGeneric extends RouteGenericInterface> =
  RouteHandlerMethod<Server, IncomingMessage, ServerResponse, RequestGeneric>
export type CustomRouteOptions<RequestGeneric extends RouteGenericInterface> =
  RouteOptions<Server, IncomingMessage, ServerResponse, RequestGeneric>
