export default class HealthRouter {
  method = 'GET'
  url = '/health'

  handler = async () => {
    return 'OK'
  }
}
