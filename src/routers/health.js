export default class HealthRouter {
  method = 'GET'
  url = '/health'

  async handler () {
    return 'OK'
  }
}
