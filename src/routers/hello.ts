import type {
  FastifyReply,
  HTTPMethods,
  RequestGenericInterface,
} from 'fastify'
import type {
  CustomRequest,
  CustomRequestHandler,
  CustomRouteOptions,
} from '../types.js'

export interface HelloRequest extends RequestGenericInterface {
  Querystring: {
    test: boolean
  }
}
export default class HelloRouter implements CustomRouteOptions<HelloRequest> {
  readonly method: HTTPMethods = 'GET'
  readonly url: string = '/hello-world'

  handler: CustomRequestHandler<HelloRequest> = async function getHelloWorld(
    request: CustomRequest<HelloRequest>,
    reply: FastifyReply,
  ): Promise<void> {
    return await reply
      .code(200)
      .send(request.query.test ? 'Hello w/ params' : 'Hello w/o params')
  }
}
