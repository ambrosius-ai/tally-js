import {
  TallyFormCreateDTO,
  TallyFormFullResponseDTO,
  TallyFormSimpleResponseDTO,
  TallyListDTO,
  TallyFormUpdateDTO,
} from '@/types'
import { isTallyError, TallyError, TallyInvalidRequestError } from '@/lib/errors'
import { HttpClient } from '@/lib/httpClient'
import { fetchWrapper } from '@/util/fetchUtil'

/**
 * Service class for interacting with Tally form endpoints
 * 
 * Provides methods to create, read, update and delete Tally forms through the API.
 * All methods return a standardized response object with the structure { data, error }, where exactly one of data or error will be defined.
 * 
 * @remarks
 * - This service is automatically instantiated by {@link TallyClient} - do not instantiate manually
 * - All methods validate required parameters and throw a {@link TallyInvalidRequestError} if required parameters are missing
 * - Responses follow the pattern: `{ data: T | null, error: TallyError | null }`
 * - HTTP errors are transformed into typed TallyError instances containing the error response from the API
 */

export class TallyFormService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async create(
    form: TallyFormCreateDTO,
  ): Promise<{ data: TallyFormSimpleResponseDTO | null; error: TallyError | null }> {
    if (!form) throw new TallyInvalidRequestError('Missing request param: form')
    return fetchWrapper<TallyFormSimpleResponseDTO>(
      this.#httpClient.post<TallyFormCreateDTO>('/forms', form),
    )
  }

  async get(
    formId: string,
  ): Promise<{ data: TallyFormFullResponseDTO | null; error: TallyError | null }> {
    if (!formId) throw new TallyInvalidRequestError('Missing request param: formId')
    return fetchWrapper<TallyFormFullResponseDTO>(this.#httpClient.get(`/forms/${formId}`))
  }

  async list(
    page?: number,
  ): Promise<{ data: TallyListDTO<TallyFormSimpleResponseDTO> | null; error: TallyError | null }> {
    if (page && !Number.isInteger(page))
      throw new TallyInvalidRequestError('Page parameter must be an integer')
    const pageUrl = !page ? '/forms' : `/forms?page=${page}`
    return fetchWrapper<TallyListDTO<TallyFormSimpleResponseDTO>>(this.#httpClient.get(pageUrl))
  }

  async update(
    form: TallyFormUpdateDTO,
  ): Promise<{ data: TallyFormSimpleResponseDTO | null; error: TallyError | null }> {
    if (!form) throw new TallyInvalidRequestError('Missing request parameters: form')
    return fetchWrapper<TallyFormSimpleResponseDTO>(
      this.#httpClient.patch<TallyFormUpdateDTO>(`/forms/${form.id}`, form),
    )
  }

  async delete(formId: string): Promise<{ data: null; error: TallyError | null }> {
    if (!formId) throw new TallyInvalidRequestError('Missing request parameter: formId')
    try {
      const { data, error: httpError } = await this.#httpClient.delete(`/forms/${formId}`)
      return { data, error: httpError } // not success data. both undefined in case of success
    } catch (error) {
      if (isTallyError(error)) {
        return { data: null, error }
      }
      throw error
    }
  }
}
