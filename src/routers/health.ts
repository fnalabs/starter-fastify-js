import { HTTPMethods, RequestGenericInterface } from 'fastify'
import { CustomRequestHandler, CustomRouteOptions } from '../types.js'

export interface HealthRequest extends RequestGenericInterface {}
export default class HealthRouter implements CustomRouteOptions<HealthRequest> {
  readonly method: HTTPMethods = 'GET'
  readonly url: string = '/health'

  handler: CustomRequestHandler<HealthRequest> = async function getHealth (): Promise<string> {
    return 'OK'
  }
}
