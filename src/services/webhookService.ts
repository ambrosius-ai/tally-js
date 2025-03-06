import { TallyError, TallyInvalidRequestError } from '@/lib/errors'
import { HttpClient } from '@/lib/httpClient'
import {
  TallyWebhookCreateDTO,
  TallyWebhookResponseDTO,
  TallyWebhookUpdateDTO,
} from '@/types/webhook.dto.types'
import { fetchWrapper } from '@/util/fetchUtil'

/**
 * Service class for interacting with Tally webhook endpoints
 * 
 * Provides methods to create, update and delete webhooks for Tally forms through the API.
 * All methods return a standardized response object with the structure { data, error }, where exactly one of data or error will be defined.
 * 
 * @remarks
 * - This service is automatically instantiated by {@link TallyClient} - do not instantiate manually
 * - All methods validate required parameters and throw a {@link TallyInvalidRequestError} if required parameters are missing
 * - Responses follow the pattern: `{ data: T | null, error: TallyError | null }`
 * - HTTP errors are transformed into typed TallyError instances containing the error response from the API
 */
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
