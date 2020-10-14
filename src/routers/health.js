export default class HealthRouter {
  method = 'GET'
  url = '/health'
  handler = this.handler

  async handler () {
    return 'OK'
  }
}
