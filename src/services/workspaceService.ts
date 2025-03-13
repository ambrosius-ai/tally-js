import {
  TallyWorkspaceCreateDTO,
  TallyWorkspaceResponseDTO,
  TallyListDTO,
  TallyWorkspaceUpdateDTO,
} from '@/types'
import { isTallyError, TallyError, TallyInvalidRequestError } from '@/lib/errors'
import { HttpClient } from '@/lib/httpClient'
import { fetchWrapper } from '@/util/fetchUtil'

/**
 * Service class for interacting with Tally workspace endpoints
 * 
 * Provides methods to create, read, update, delete and list Tally workspaces through the API.
 * All methods return a standardized response object with the structure { data, error }, where exactly one of data or error will be defined.
 * 
 * @category Services
 * @remarks
 * - This service is automatically instantiated by {@link TallyClient} - do not instantiate manually
 * - All methods validate required parameters and throw a {@link TallyInvalidRequestError} if required parameters are missing
 * - Responses follow the pattern: `{ data: T | null, error: TallyError | null }`
 * - HTTP errors are transformed into typed TallyError instances containing the error response from the API
 * - The list method supports pagination through an optional page parameter
 */
export class TallyWorkspaceService {
  #httpClient: HttpClient
  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient
  }

  async create(
    workspace: TallyWorkspaceCreateDTO,
  ): Promise<{ data: TallyWorkspaceResponseDTO | null; error: TallyError | null }> {
    if (!workspace) throw new TallyInvalidRequestError('Missing request param: workspace')
    return fetchWrapper<TallyWorkspaceResponseDTO>(
      this.#httpClient.post<TallyWorkspaceCreateDTO>('/workspaces', workspace),
    )
  }

  async get(
    workspaceId: string,
  ): Promise<{ data: TallyWorkspaceResponseDTO | null; error: TallyError | null }> {
    if (!workspaceId) throw new TallyInvalidRequestError('Missing request param: workspaceId')
    return fetchWrapper<TallyWorkspaceResponseDTO>(
      this.#httpClient.get(`/workspaces/${workspaceId}`),
    )
  }

  async list(
    page?: number,
  ): Promise<{ data: TallyListDTO<TallyWorkspaceResponseDTO> | null; error: TallyError | null }> {
    if (page && !Number.isInteger(page))
      throw new TallyInvalidRequestError('Page parameter must be an integer')
    const pageUrl = !page ? '/workspaces' : `/workspaces?page=${page}`
    return fetchWrapper<TallyListDTO<TallyWorkspaceResponseDTO>>(this.#httpClient.get(pageUrl))
  }

  async update(
    workspace: TallyWorkspaceUpdateDTO,
  ): Promise<{ data: TallyWorkspaceResponseDTO | null; error: TallyError | null }> {
    if (!workspace) throw new TallyInvalidRequestError('Missing request parameters: workspace')
    return fetchWrapper<TallyWorkspaceResponseDTO>(
      this.#httpClient.patch<TallyWorkspaceUpdateDTO>(`/workspaces/${workspace.id}`, workspace),
    )
  }

  async delete(workspaceId: string): Promise<{ data: null; error: TallyError | null }> {
    if (!workspaceId) throw new TallyInvalidRequestError('Missing request parameter: workspaceId')
    try {
      const { data, error: httpError } = await this.#httpClient.delete(`/workspaces/${workspaceId}`)
      return { data, error: httpError }
    } catch (error) {
      if (isTallyError(error)) {
        return { data: null, error }
      }
      throw error
    }
  }
}
