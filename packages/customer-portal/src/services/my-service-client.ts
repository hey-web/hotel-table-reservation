import ServiceClient from './service-client'
import { token, getToken } from 'states/token'

const serviceClient = new ServiceClient(
  import.meta.env.VITE_SERVICE_BASE_URL,
  new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` })
)

token.subscribe((tokenValue) => {
  const headers = serviceClient.getHeaders()
  headers.set('Authorization', `Bearer ${tokenValue}`)
  serviceClient.setHeaders(headers)
})

export default serviceClient
