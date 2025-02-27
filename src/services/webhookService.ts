import { TallyError, TallyInvalidRequestError } from '@/lib/errors'
import { HttpClient } from '@/lib/httpClient'
import {
  TallyWebhookCreateDTO,
  TallyWebhookResponseDTO,
  TallyWebhookUpdateDTO,
} from '@/types/webhook.dto.types'
import { fetchWrapper } from '@/util/fetchUtil'

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

  async update(
    webhook: TallyWebhookUpdateDTO,
  ): Promise<{ data: TallyWebhookResponseDTO | null; error: TallyError | null }> {
    if (!webhook) throw new TallyInvalidRequestError('Missing request param: webhook')
    return fetchWrapper<TallyWebhookResponseDTO>(
      this.#httpClient.patch<TallyWebhookUpdateDTO>(`/webhooks/${webhook.id}`, webhook),
    )
  }

  async delete(webhookId: string): Promise<{ data: null; error: TallyError | null }> {
    if (!webhookId) throw new TallyInvalidRequestError('Missing request param: webhookId')
    try {
      const { data, error: httpError } = await this.#httpClient.delete(`/webhooks/${webhookId}`)
      return { data, error: httpError }
    } catch (error) {
      if (error instanceof TallyError) {
        return { data: null, error }
      }
      throw error
    }
  }
}
