/* eslint-env jest */
import { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'

import main from '../src'

const fastifyMock = {
  register: jest.fn(),
  route: jest.fn()
}

describe('main', () => {
  beforeAll(async () => await main(fastifyMock as unknown as FastifyInstance))

  it('should initialize the app successfully', () => {
    expect(fastifyMock.register).toBeCalledTimes(2)
    expect(fastifyMock.register).nthCalledWith(1, cors)
    expect(fastifyMock.register).nthCalledWith(2, helmet)

    expect(fastifyMock.route).toBeCalledTimes(2)
  })
})
