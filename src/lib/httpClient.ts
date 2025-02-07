import { TallyError } from './errors'

// Types for the HTTP client abstraction
export interface HttpResponse<T> {
  data?: T
  error?: TallyError
}

export interface HttpClient {
  get(url: string): Promise<HttpResponse<any>>
  post<T>(url: string, data: T): Promise<HttpResponse<any>>
  put<T>(url: string, data: T): Promise<HttpResponse<any>>
  delete(url: string): Promise<HttpResponse<any>>
}

// Implementation of the HTTP client using fetch
export class FetchHttpClient implements HttpClient {
  #baseUrl: string
  #headers: Record<string, string>
  constructor(baseUrl: string, headers: Record<string, string>) {
    this.#baseUrl = baseUrl
    this.#headers = headers
  }

  private async _request(url: string, options: RequestInit): Promise<HttpResponse<any>> {
    const response = await fetch(`${this.#baseUrl}${url}`, {
      ...options,
      headers: {
        ...this.#headers,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    const data = response.ok ? ((await response.json()) as unknown) : undefined
    // TODO: define fine grained error types
    const error = !response.ok ? (new Error(response.statusText) as TallyError) : undefined

    return { data, error }
  }

  async get(url: string): Promise<HttpResponse<any>> {
    return this._request(url, { method: 'GET' })
  }

  async post<T>(url: string, data: T): Promise<HttpResponse<any>> {
    return this._request(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(url: string, data: T): Promise<HttpResponse<any>> {
    return this._request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete(url: string): Promise<HttpResponse<any>> {
    return this._request(url, { method: 'DELETE' })
  }
}
