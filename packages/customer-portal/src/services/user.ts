import myServiceClient from './my-service-client'
import { clearToken } from 'states/token'

export async function signin({ email, password }: { email: string; password: string }) {
  return myServiceClient.request('/users/login', { method: 'post', body: { email, password } })
}

export async function signup(body: { email: string; username: string; password: string }) {
  return myServiceClient.request('signup', { method: 'post', body })
}

export async function signout() {
  clearToken()
  return Promise.resolve(null)
}
