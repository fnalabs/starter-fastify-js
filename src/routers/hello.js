export default class HelloRouter {
  method = 'GET'
  url = '/hello-world'
  handler = this.handler

  async handler (request, reply) {
    return 'Hello World'
  }
}
