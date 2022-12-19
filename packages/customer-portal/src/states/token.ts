import { BehaviorSubject } from "rxjs";
import jwt_decode from "jwt-decode";

const savedToken = localStorage.getItem('token')
const token$ = new BehaviorSubject<string | null>(savedToken)
export const token = token$.asObservable()

const subscription = token.subscribe(token => {
  token ? localStorage.setItem("token", token) : localStorage.removeItem('token')
})

export function isExpired(token: string) {
  const decoded = jwt_decode<{exp: number}>(token)
  return Date.now() >= decoded.exp * 1000
}

export function getToken() {
  return token$.getValue()
}

async function sleep(durning: number) {
  return new Promise((resolve) => {
    setTimeout(() => {resolve(null)}, durning)
  })
}

export async function getTokenWaitUtilFilled() {
  return new Promise((resolve) => {
    (async () => {
      while(getToken() == null) {
        await sleep(200)
      }
      resolve(getToken())
    })()
    
  })
}

export function setToken(token: string) {
  token$.next(token)
}

export function clearToken() {
  token$.next(null)
}

window.addEventListener('unload', () => {
  const token = getToken()
  token ? localStorage.setItem("token", token) : localStorage.removeItem('token')
})