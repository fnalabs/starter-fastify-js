/* eslint-env jest */
import type { FastifyReply } from 'fastify'
import type { CustomRequest } from '../types.js'
import type { HelloRequest } from './hello.js'
import HelloRouter from './hello.js'

describe('router', () => {
  const request: Pick<CustomRequest<HelloRequest>, 'query'> = {
    query: { test: false },
  }
  const response: Pick<FastifyReply, 'code' | 'send'> = {
    code: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let router: any

  describe('#constructor', () => {
    beforeAll(() => {
      router = new HelloRouter()
    })

    it('should have `method` and `url` defined correctly', () => {
      expect(router.method).toBe('GET')
      expect(router.url).toBe('/hello-world')

      expect(typeof router.handler).toBe('function')
    })
  })

  describe('#handler', () => {
    afterEach(() => {
      request.query.test = !request.query.test
      jest.clearAllMocks()
    })

    beforeEach(() => {
      router = new HelloRouter()
    })

    it('should respond with `Hello without params` successfully', async () => {
      const reply = await router.handler(request, response)

      expect(reply.code).toHaveBeenCalledTimes(1)
      expect(reply.send).toHaveBeenCalledTimes(1)
      expect(reply.send).toHaveBeenLastCalledWith('Hello w/o params')
    })

    it('should respond with `Hello with params` successfully', async () => {
      const reply = await router.handler(request, response)

      expect(reply.code).toHaveBeenCalledTimes(1)
      expect(reply.send).toHaveBeenCalledTimes(1)
      expect(reply.send).toHaveBeenLastCalledWith('Hello w/ params')
    })
  })
})
