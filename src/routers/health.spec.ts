/* eslint-env jest */
import HealthRouter from './health.js'

describe('router', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let router: any

  describe('#constructor', () => {
    beforeAll(() => {
      router = new HealthRouter()
    })

    it('should have `method` and `url` defined correctly', () => {
      expect(router.method).toBe('GET')
      expect(router.url).toBe('/health')

      expect(typeof router.handler).toBe('function')
    })
  })

  describe('#handler', () => {
    beforeAll(() => {
      router = new HealthRouter()
    })

    it('should respond with `OK` successfully', async () => {
      await expect(router.handler()).resolves.toBe('OK')
    })
  })
})
