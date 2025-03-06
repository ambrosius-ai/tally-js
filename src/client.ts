import { TallyFormService } from './services/formService'
import { FetchHttpClient, HttpClient } from './lib/httpClient'
import { TallyInvalidClientConfigError } from './lib'
import { TallySubmissionService, TallyWebhookService, TallyWorkspaceService } from './services'
import { TallyUserService } from './services/userService'

/**
 * Main client class for interacting with the Tally API
 * 
 * This is the primary entry point for using the Tally API wrapper. It provides access to all API functionality
 * through specialized service classes that handle different resource types (forms, webhooks, etc).
 * 
 * @remarks
 * The client automatically handles:
 * - Authentication via API key
 * - Base URL configuration
 * - API version selection
 * - HTTP request/response lifecycle
 * - Error handling and type conversion
 * 
 * @example
 * ```typescript
 * const client = new TallyClient('tly-1234', 'https://api.tally.so')
 * 
 * // Access forms API
 * const { data, error } = await client.forms.list()
 * 
 * // Create a webhook
 * const { data, error } = await client.webhooks.create({
 *   formId: 'abc123',
 *   url: 'https://my-site.com/webhook',
 *   events: ['form.submission.created']
 * })
 * ```
 * 
 * @category Core
 */

export class TallyClient {
  #httpClient: HttpClient
  readonly forms: TallyFormService
  readonly webhooks: TallyWebhookService
  readonly workspaces: TallyWorkspaceService
  readonly submissions: TallySubmissionService
  readonly users: TallyUserService

  constructor(apiKey: string, baseUrl: string, version?: string) {
    if (!this.validateApiKey(apiKey)) {
      throw new TallyInvalidClientConfigError('Invalid API key: ' + apiKey)
    }
    if (!this.isValidUrl(baseUrl)) {
      throw new TallyInvalidClientConfigError('Invalid base URL: ' + baseUrl)
    }
    if (version != null && !this.validateVersion(version)) {
      throw new TallyInvalidClientConfigError(
        'Invalid version specified, expected yyyy-mm-dd, got this: ' + version,
      )
    }

    try {
      this.#httpClient = new FetchHttpClient(baseUrl, {
        Authorization: `Bearer ${apiKey}`,
        ...(version ? { 'tally-version': version } : {}),
      })

      this.forms = new TallyFormService(this.#httpClient)
      this.webhooks = new TallyWebhookService(this.#httpClient)
      this.workspaces = new TallyWorkspaceService(this.#httpClient)
      this.submissions = new TallySubmissionService(this.#httpClient)
      this.users = new TallyUserService(this.#httpClient)
    } catch (error) {
      throw new TallyInvalidClientConfigError('Failed to initialize TallyClient: ' + error)
    }
  }

  private validateApiKey(apiKey: string): boolean {
    return apiKey != null && apiKey.startsWith('tly-')
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  private validateVersion(version: string): boolean {
    const versionPattern = /^\d{4}-\d{2}-\d{2}$/
    return versionPattern.test(version)
  }
}
