/* eslint-env mocha */
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import dirtyChai from 'dirty-chai'

import { HealthRouter } from '../../src/routers'

chai.use(chaiAsPromised)
chai.use(dirtyChai)

describe('router', () => {
  let router

  describe('#constructor', () => {
    after(() => { router = null })

    before(() => { router = new HealthRouter() })

    it('should have `method` and `url` defined correctly', () => {
      expect(router).to.exist()

      expect(router.method).to.equal('GET')
      expect(router.url).to.equal('/health')

      expect(router.handler).to.be.a('function')
    })
  })

  describe('#handler', () => {
    after(() => { router = null })

    before(() => { router = new HealthRouter() })

    it('should respond with `OK` successfully', async () => {
      await expect(router.handler()).to.eventually.equal('OK')
    })
  })
})
