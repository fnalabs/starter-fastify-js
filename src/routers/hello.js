export default class HelloRouter {
  method = 'GET'
  url = '/hello-world'

  handler = async (request, reply) => 'Hello World'
}
