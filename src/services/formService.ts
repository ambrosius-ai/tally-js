import {
  TallyFormCreateDTO,
  TallyFormFullResponseDTO,
  TallyFormSimpleResponseDTO,
  TallyListDTO,
  TallyFormUpdateDTO,
} from '../types'
import { TallyError } from '../lib/errors'
import { HttpClient } from '../lib/httpClient'

export class TallyFormService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async create(
    form: TallyFormCreateDTO,
  ): Promise<{ data?: TallyFormSimpleResponseDTO; error?: TallyError }> {
    const { data, error } = await this.#httpClient.post<TallyFormCreateDTO>('/forms', form)
    const formData = data ? (data as TallyFormSimpleResponseDTO) : undefined
    return { data: formData, error }
  }

  async get(formId: string): Promise<{ data?: TallyFormFullResponseDTO; error?: TallyError }> {
    const { data, error } = await this.#httpClient.get(`/forms/${formId}`)
    const formData = data ? (data as TallyFormFullResponseDTO) : undefined
    return { data: formData, error }
  }

  async list(
    page?: number,
  ): Promise<{ data?: TallyListDTO<TallyFormSimpleResponseDTO>; error?: TallyError }> {
    const pageUrl = !page ? '/forms' : `/forms?page=${page}`
    const { data, error } = await this.#httpClient.get(pageUrl)
    const formData = data ? (data as TallyListDTO<TallyFormSimpleResponseDTO>) : undefined
    return { data: formData, error }
  }

  async update(
    form: TallyFormUpdateDTO,
  ): Promise<{ data?: TallyFormSimpleResponseDTO; error?: TallyError }> {
    const { data, error } = await this.#httpClient.patch<TallyFormUpdateDTO>(
      `/forms/${form.id}`,
      form,
    )
    const formData = data ? (data as TallyFormSimpleResponseDTO) : undefined
    return { data: formData, error }
  }

  async delete(formId: string): Promise<{ data?: undefined; error?: TallyError }> {
    const { data, error } = await this.#httpClient.delete(`/forms/${formId}`)
    return { data, error } // not success data. both undefined in case of success
  }
}
