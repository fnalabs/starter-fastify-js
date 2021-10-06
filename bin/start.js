import fs from 'fs'
import fastify from 'fastify'
import { PORT, SSL_CERT_PATH, SSL_KEY_PATH } from '../lib/config'
import main from '../lib'

const OPTIONS = {
  http2: true,
  https: {
    allowHTTP1: true,
    cert: fs.readFileSync(SSL_CERT_PATH),
    key: fs.readFileSync(SSL_KEY_PATH)
  },
  logger: true
}

main(fastify(OPTIONS)).then(server => {
  server.listen(PORT, '0.0.0.0', () => {
    console.info('app running on port', PORT)
  })
})
