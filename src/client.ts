
import { TallyFormService } from './services/formService'
import { FetchHttpClient, HttpClient } from './lib/httpClient'

export class TallyClient {
  #httpClient: HttpClient
  readonly forms: TallyFormService

  constructor(apiKey: string, baseUrl: string) {
    this.#httpClient = new FetchHttpClient(baseUrl, {
      Authorization: `Bearer ${apiKey}`,
    })

    this.forms = new TallyFormService(this.#httpClient)
  }
}
