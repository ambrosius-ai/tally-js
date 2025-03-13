import { HttpClient } from '@/lib'
import { fetchWrapper } from '@/util/fetchUtil'
import { isTallyError, TallyError, TallyInvalidRequestError } from '@/lib/errors'
import {
  TallySubmissionListDTO,
  TallySubmissionRequestDTO,
  TallySubmissionRequestFilter,
} from '@/types/submission.types'

/**
 * Service class for interacting with Tally form submission endpoints
 * 
 * Provides methods to list and delete form submissions through the API.
 * All methods return a standardized response object with the structure { data, error }, where exactly one of data or error will be defined.
 * 
 * @category Services
 * @remarks
 * - This service is automatically instantiated by {@link TallyClient} - do not instantiate manually
 * - All methods validate required parameters and throw a {@link TallyInvalidRequestError} if required parameters are missing
 * - Responses follow the pattern: `{ data: T | null, error: TallyError | null }`
 * - HTTP errors are transformed into typed TallyError instances containing the error response from the API
 * - The list method supports filtering submissions by status (all, completed, partial) and pagination
 * - Submissions can be retrieved for specific forms using the formId parameter
 */
export class TallySubmissionService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async list(
    options: TallySubmissionRequestDTO,
  ): Promise<{ data: TallySubmissionListDTO | null; error: TallyError | null }> {
    if (!options) throw new TallyInvalidRequestError('Missing request param: options')
    if (!options.formId) throw new TallyInvalidRequestError('Missing request param: formId')
    const url = this.buildRequestUrl(options)
    return fetchWrapper<TallySubmissionListDTO>(this.#httpClient.get(url))
  }

  async delete(
    formsId: string,
    submissionId: string,
  ): Promise<{ data: null; error: TallyError | null }> {
    if (!formsId) throw new TallyInvalidRequestError('Missing request param: formsId')
    if (!submissionId) throw new TallyInvalidRequestError('Missing request param: submissionId')
    try {
      const { data, error: httpError } = await this.#httpClient.delete(
        `/forms/${formsId}/submissions/${submissionId}`,
      )
      return { data, error: httpError } // not success data. both undefined in case of success
    } catch (error) {
      if (isTallyError(error)) {
        return { data: null, error }
      }
      throw error
    }
  }

  private buildRequestUrl(options: TallySubmissionRequestDTO): string {
    let url = `/forms/${options.formId}/submissions`
    if (options.page) {
      url += `?page=${options.page}`
    } else {
      url += '?page=1'
    }
    if (options.filter && Object.values(TallySubmissionRequestFilter).includes(options.filter)) {
      url += `&filter=${options.filter}`
    }
    if (options.submissionId) {
      url += `&submissionId=${options.submissionId}`
    }
    return url
  }
}
