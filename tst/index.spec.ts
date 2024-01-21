/* eslint-env jest */
import { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

import main from '../src/index.js'

const fastifyMock = {
  register: jest.fn(),
  route: jest.fn()
}

describe('main', () => {
  beforeAll(async () => await main(fastifyMock as unknown as FastifyInstance))

  it('should initialize the app successfully', () => {
    expect(fastifyMock.register).toHaveBeenCalledTimes(2)
    expect(fastifyMock.register).toHaveBeenNthCalledWith(1, cors)
    expect(fastifyMock.register).toHaveBeenNthCalledWith(2, helmet)

    expect(fastifyMock.route).toHaveBeenCalledTimes(2)
  })
})
