export const NODE_ENV = process.env.NODE_ENV ?? 'production'
export const PORT =
  typeof process.env.PORT !== 'undefined'
    ? Number.parseInt(process.env.PORT, 10)
    : 3000
export const SSL_CERT_PATH = process.env.SSL_CERT_PATH ?? 'cert/ssl-cert.pem'
export const SSL_KEY_PATH = process.env.SSL_KEY_PATH ?? 'cert/ssl-key.pem'
