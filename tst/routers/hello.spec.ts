/* eslint-env jest */
import { HelloRouter } from '../../src/routers'

describe('router', () => {
  const request = { query: { test: false } }
  let response, router

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
      response = null
      router = null
    })

    beforeEach(() => {
      response = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis()
      }
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
