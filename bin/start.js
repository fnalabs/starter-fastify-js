import fs from 'fs'
import fastify from 'fastify'
import { NODE_ENV, PORT, SSL_CERT_PATH, SSL_KEY_PATH } from '../lib/config'
import main from '../lib'

const OPTIONS = {
  http2: true,
  https: {
    allowHTTP1: true,
    cert: fs.readFileSync(SSL_CERT_PATH),
    key: fs.readFileSync(SSL_KEY_PATH)
  },
  logger: NODE_ENV !== 'production'
}
const SERVER = {
  host: '::',
  port: PORT
}

main(fastify(OPTIONS)).then(server => {
  server.listen(SERVER, (error, address) => {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
    console.info(NODE_ENV, 'app running on port', address)
  })
})
