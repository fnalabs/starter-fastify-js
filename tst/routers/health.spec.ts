/* eslint-env mocha */
import HealthRouter from '../../src/routers/health.js'

describe('router', () => {
  let router

  describe('#constructor', () => {
    afterAll(() => { router = null })

    beforeAll(() => { router = new HealthRouter() })

    it('should have `method` and `url` defined correctly', () => {
      expect(router.method).toBe('GET')
      expect(router.url).toBe('/health')

      expect(typeof router.handler).toBe('function')
    })
  })

  describe('#handler', () => {
    afterAll(() => { router = null })

    beforeAll(() => { router = new HealthRouter() })

    it('should respond with `OK` successfully', async () => {
      await expect(router.handler()).resolves.toBe('OK')
    })
  })
})
