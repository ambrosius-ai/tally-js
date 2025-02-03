import {
  TallyForm,
  TallyFormFullResponseDTO,
  TallyFormListDTO,
  TallyFormSimpleResponseDTO,
} from '../types'
import { TallyError } from '../lib/errors'
import { HttpClient } from '../lib/httpClient'

export class TallyFormService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async create(
    form: TallyForm,
  ): Promise<{ data?: TallyFormSimpleResponseDTO; error?: TallyError }> {
    return this.#httpClient.post('/forms', form)
  }

  async get(formId: string): Promise<{ data?: TallyFormFullResponseDTO; error?: TallyError }> {
    return this.#httpClient.get(`/forms/${formId}`)
  }

  async list(): Promise<{ data?: TallyFormListDTO; error?: TallyError }> {
    return this.#httpClient.get('/forms')
  }

  // async update(form: TallyForm): Promise<TallyForm> {
  //   return new Promise((resolve, reject) => {
  //     reject(new TallyError('Not implemented'))
  //   })
  // }

  // async delete(formId: string): Promise<TallyForm> {
  //   return new Promise((resolve, reject) => {
  //     reject(new TallyError('Not implemented'))
  //   })
  // }
}
