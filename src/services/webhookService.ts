import { TallyInvalidRequestError } from '../lib/errors'
import { HttpClient } from '../lib/httpClient'
import { TallyWebhookCreateDTO, TallyWebhookResponseDTO } from '../types/webhook.dto.types'
import { fetchWrapper } from '../util/fetchUtil'

export class TallyWebhookService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async create(
    webhook: TallyWebhookCreateDTO,
  ): Promise<{ data: TallyWebhookResponseDTO | null; error: Error | null }> {
    if (!webhook) throw new TallyInvalidRequestError('Missing request param: webhook')
    return fetchWrapper<TallyWebhookResponseDTO>(
      this.#httpClient.post<TallyWebhookCreateDTO>('/webhooks', webhook),
    )
  }
}
