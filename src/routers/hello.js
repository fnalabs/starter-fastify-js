export default class HelloRouter {
  method = 'GET'
  url = '/hello-world'

  async handler (request, reply) {
    return 'Hello World'
  }
}
