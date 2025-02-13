import {
  TallyFormCreateDTO,
  TallyFormFullResponseDTO,
  TallyFormSimpleResponseDTO,
  TallyListDTO,
  TallyFormUpdateDTO,
} from '../types'
import { isTallyError, TallyError, TallyInvalidRequestError } from '../lib/errors'
import { HttpClient } from '../lib/httpClient'

export class TallyFormService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async create(
    form: TallyFormCreateDTO,
  ): Promise<{ data: TallyFormSimpleResponseDTO | null; error: TallyError | null }> {
    if (!form) throw new TallyInvalidRequestError('Missing request param: form')
    try {
      const { data, error: httpError } = await this.#httpClient.post<TallyFormCreateDTO>(
        '/forms',
        form,
      )
      const formData = data ? (data as TallyFormSimpleResponseDTO) : null
      return { data: formData, error: httpError }
    } catch (error) {
      if (isTallyError(error)) {
        return { data: null, error }
      }
      throw error
    }
  }

  async get(
    formId: string,
  ): Promise<{ data: TallyFormFullResponseDTO | null; error: TallyError | null }> {
    if (!formId) throw new TallyInvalidRequestError('Missing request param: formId')
    const { data, error } = await this.#httpClient.get(`/forms/${formId}`)
    const formData = data ? (data as TallyFormFullResponseDTO) : null
    return { data: formData, error }
  }

  async list(
    page?: number,
  ): Promise<{ data: TallyListDTO<TallyFormSimpleResponseDTO> | null; error: TallyError | null }> {
    if (page && !Number.isInteger(page))
      throw new TallyInvalidRequestError('Page parameter must be an integer')
    try {
      const pageUrl = !page ? '/forms' : `/forms?page=${page}`
      const { data, error: httpError } = await this.#httpClient.get(pageUrl)
      const formData = data ? (data as TallyListDTO<TallyFormSimpleResponseDTO>) : null
      return { data: formData, error: httpError }
    } catch (error) {
      if (isTallyError(error)) {
        return { data: null, error }
      }
      throw error
    }
  }

  async update(
    form: TallyFormUpdateDTO,
  ): Promise<{ data: TallyFormSimpleResponseDTO | null; error: TallyError | null }> {
    if (!form) throw new TallyInvalidRequestError('Missing request parameters: form')
    try {
      const { data, error: httpError } = await this.#httpClient.patch<TallyFormUpdateDTO>(
        `/forms/${form.id}`,
        form,
      )
      const formData = data ? (data as TallyFormSimpleResponseDTO) : null
      return { data: formData, error: httpError }
    } catch (error) {
      if (isTallyError(error)) {
        return { data: null, error }
      }
      throw error
    }
  }

  async delete(formId: string): Promise<{ data: null; error: TallyError | null }> {
    try {
      if (!formId) throw new TallyInvalidRequestError('Missing request parameter: formId')
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
