import { HttpClient, TallyError } from '@/lib'
import { TallyUserDTO } from '@/types'
import { fetchWrapper } from '@/util'

export class TallyUserService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async getMe(): Promise<{ data: TallyUserDTO | null; error: TallyError | null }> {
    return fetchWrapper<TallyUserDTO>(this.#httpClient.get('/users/me'))
  }
}
