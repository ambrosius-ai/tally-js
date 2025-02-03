import { TallyError } from './errors'

// Types for the HTTP client abstraction
export interface HttpResponse<T> {
  data?: T
  error?: TallyError
}

export interface HttpClient {
  get<T>(url: string): Promise<HttpResponse<T>>
  post<T>(url: string, data: unknown): Promise<HttpResponse<T>>
  put<T>(url: string, data: unknown): Promise<HttpResponse<T>>
  delete<T>(url: string): Promise<HttpResponse<T>>
}

// Implementation of the HTTP client using fetch
export class FetchHttpClient implements HttpClient {
  #baseUrl: string
  #headers: Record<string, string>
  constructor(baseUrl: string, headers: Record<string, string>) {
    this.#baseUrl = baseUrl
    this.#headers = headers
  }

  private async _request<T>(url: string, options: RequestInit): Promise<HttpResponse<T>> {
    const response = await fetch(`${this.#baseUrl}${url}`, {
      ...options,
      headers: {
        ...this.#headers,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    const data = response.ok ? ((await response.json()) as T) : undefined
    // TODO: define fine grained error types
    const error = !response.ok ? (new Error(await response.statusText) as TallyError) : undefined

    return { data, error }
  }

  async get<T>(url: string): Promise<HttpResponse<T>> {
    return this._request<T>(url, { method: 'GET' })
  }

  async post<T>(url: string, data: unknown): Promise<HttpResponse<T>> {
    return this._request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(url: string, data: unknown): Promise<HttpResponse<T>> {
    return this._request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(url: string): Promise<HttpResponse<T>> {
    return this._request<T>(url, { method: 'DELETE' })
  }
}
