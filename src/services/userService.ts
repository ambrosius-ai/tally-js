import { HttpClient, TallyError } from '@/lib'
import { TallyUserDTO } from '@/types'
import { fetchWrapper } from '@/util'

/**
 * Service class for interacting with Tally user endpoints
 * 
 * Provides methods to retrieve information about the currently authenticated user through the API.
 * All methods return a standardized response object with the structure { data, error }, where exactly one of data or error will be defined.
 * 
 * @remarks
 * - This service is automatically instantiated by {@link TallyClient} - do not instantiate manually
 * - All methods validate required parameters and throw a {@link TallyInvalidRequestError} if required parameters are missing
 * - Responses follow the pattern: `{ data: T | null, error: TallyError | null }`
 * - HTTP errors are transformed into typed TallyError instances containing the error response from the API
 * - The getMe method requires a valid authentication token to be set in the client
 */
export class TallyUserService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async getMe(): Promise<{ data: TallyUserDTO | null; error: TallyError | null }> {
    return fetchWrapper<TallyUserDTO>(this.#httpClient.get('/users/me'))
  }
}
