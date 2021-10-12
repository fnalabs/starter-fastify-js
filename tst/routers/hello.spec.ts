/* eslint-env jest */
import { FastifyReply } from 'fastify'
import { CustomRequest } from '../../src/types'
import HelloRouter, { HelloRequest } from '../../src/routers/hello'

describe('router', () => {
  const request: Pick<CustomRequest<HelloRequest>, 'query'> = { query: { test: false } }
  const response: Pick<FastifyReply, 'code' | 'send'> = {
    code: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis()
  }
  let router

  describe('#constructor', () => {
    afterAll(() => { router = null })

    beforeAll(() => { router = new HelloRouter() })

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
      router = null
    })

    beforeEach(() => {
      router = new HelloRouter()
    })

    it('should respond with `Hello without params` successfully', async () => {
      const reply = await router.handler(request, response)

      expect(reply.code).toBeCalledTimes(1)
      expect(reply.send).toBeCalledTimes(1)
      expect(reply.send).lastCalledWith('Hello w/o params')
    })

    it('should respond with `Hello with params` successfully', async () => {
      const reply = await router.handler(request, response)

      expect(reply.code).toBeCalledTimes(1)
      expect(reply.send).toBeCalledTimes(1)
      expect(reply.send).lastCalledWith('Hello w/ params')
    })
  })
})
