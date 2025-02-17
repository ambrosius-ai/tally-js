import { TallyFormService } from './services/formService'
import { FetchHttpClient, HttpClient } from './lib/httpClient'
import { TallyInvalidClientConfigError } from './lib'
import { TallyWebhookService, TallyWorkspaceService } from './services'

export class TallyClient {
  #httpClient: HttpClient
  readonly forms: TallyFormService
  readonly webhooks: TallyWebhookService
  readonly workspaces: TallyWorkspaceService

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
