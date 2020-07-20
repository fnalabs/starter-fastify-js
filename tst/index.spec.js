/* eslint-env mocha */
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import dirtyChai from 'dirty-chai'
import sinon from 'sinon'

import cors from 'fastify-cors'
import helmet from 'fastify-helmet'

import main from '../src'
import { HealthRouter, HelloRouter } from '../src/routers'

chai.use(chaiAsPromised)
chai.use(dirtyChai)

const fastifyMock = {
  register: sinon.spy(),
  route: sinon.spy()
}

describe('main', () => {
  before(() => main(fastifyMock))

  it('should initialize the app successfully', () => {
    expect(fastifyMock.register.calledTwice).to.be.true()
    expect(fastifyMock.register.firstCall.calledWith(cors)).to.be.true()
    expect(fastifyMock.register.secondCall.calledWith(helmet)).to.be.true()

    expect(fastifyMock.route.calledTwice).to.be.true()
    expect(fastifyMock.route.firstCall.calledWith(new HealthRouter())).to.be.true()
    expect(fastifyMock.route.secondCall.calledWith(new HelloRouter())).to.be.true()
  })
})
