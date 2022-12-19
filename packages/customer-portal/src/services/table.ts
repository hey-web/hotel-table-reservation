import myServiceClient from './my-service-client'

export async function get() {
  return myServiceClient.request('/tables', { method: 'get' })
}
