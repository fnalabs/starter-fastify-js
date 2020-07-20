/* eslint-env mocha */
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import dirtyChai from 'dirty-chai'

import { HelloRouter } from '../../src/routers'

chai.use(chaiAsPromised)
chai.use(dirtyChai)

describe('router', () => {
  let router, request

  describe('#constructor', () => {
    after(() => { router = null })

    before(() => { router = new HelloRouter() })

    it('should have `method` and `url` defined correctly', () => {
      expect(router).to.exist()

      expect(router.method).to.equal('GET')
      expect(router.url).to.equal('/hello-world')

      expect(router.handler).to.be.a('function')
    })
  })

  describe('#handler', () => {
    after(() => { router = null })

    before(() => { router = new HelloRouter() })

    it('should respond with `Hello World` successfully', async () => {
      await expect(router.handler(request)).to.eventually.equal('Hello World')
    })
  })
})
