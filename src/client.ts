import { TallyFormService } from './services/formService'
import { FetchHttpClient, HttpClient } from './lib/httpClient'
import { TallyInvalidClientConfigError } from './lib'

export class TallyClient {
  #httpClient: HttpClient
  readonly forms: TallyFormService

  //TODO: allow api version
  constructor(apiKey: string, baseUrl: string) {
    if (!this.validateApiKey(apiKey)) {
      throw new TallyInvalidClientConfigError('Invalid API key: ' + apiKey)
    }
    if (!this.isValidUrl(baseUrl)) {
      throw new TallyInvalidClientConfigError('Invalid base URL: ' + baseUrl)
    }

    try {
      this.#httpClient = new FetchHttpClient(baseUrl, {
        Authorization: `Bearer ${apiKey}`,
      })

      this.forms = new TallyFormService(this.#httpClient)
    } catch (error) {
      throw new TallyInvalidClientConfigError('Failed to initialize TallyClient: ' + error)
    }
  }

  private validateApiKey(apiKey: string): boolean {
    return apiKey != null && apiKey.startsWith('tly-')
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
}
