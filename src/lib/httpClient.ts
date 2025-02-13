import { TallyApiError, TallyError, TallyUnknowError } from './errors'

// Types for the HTTP client abstraction
export interface HttpResponse<T> {
  data: T | null
  error: TallyError | null
}

export interface HttpClient {
  get(url: string): Promise<HttpResponse<any>>
  post<T>(url: string, data: T): Promise<HttpResponse<any>>
  patch<T>(url: string, data: T): Promise<HttpResponse<any>>
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
    let data = null
    let error = null
    try {
      const response = await fetch(`${this.#baseUrl}${url}`, {
        ...options,
        headers: {
          ...this.#headers,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })
      data = response.ok && response.status !== 204 ? ((await response.json()) as unknown) : null
      error = !response.ok ? new TallyApiError(response.statusText, response.status) : null
    } catch (unknownError: unknown) {
      data = null
      error = new TallyUnknowError('Unknown API Error', unknownError)
    } finally {
      return { data, error }
    }
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

  async patch<T>(url: string, data: T): Promise<HttpResponse<any>> {
    return this._request(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete(url: string): Promise<HttpResponse<any>> {
    return this._request(url, { method: 'DELETE' })
  }
}
