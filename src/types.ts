import { FastifyRequest, RouteHandlerMethod, RouteOptions } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'

export type CustomRequest<RequestGeneric> = FastifyRequest<RequestGeneric>
export type CustomRequestHandler<RequestGeneric> = RouteHandlerMethod<Server, IncomingMessage, ServerResponse, RequestGeneric>
export type CustomRouteOptions<RequestGeneric> = RouteOptions<Server, IncomingMessage, ServerResponse, RequestGeneric>
