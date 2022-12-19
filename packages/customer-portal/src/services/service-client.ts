
type Method = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete'

class ServiceClient {
  private baseURL: string
  private headers: Headers
  constructor(baseURL: string, headers: Headers) {
    this.baseURL = baseURL
    this.headers = headers
  }
  getHeaders() {
    return this.headers
  }
  setHeaders(headers: Headers) {
    this.headers = headers
  }
  async request(path: string, {method, body}:{method: Method, body?: Object }) {
    const url = new URL(path, this.baseURL)
    return fetch(url, {headers: this.headers, method: method.toUpperCase(), body: JSON.stringify(body) })
  }
}

export default ServiceClient