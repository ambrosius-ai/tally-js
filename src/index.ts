export class TallyClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  getVersion(): string {
    return '0.1.0'
  }

  getApiKey(): string {
    return this.apiKey
  }
}

// Example usage
const client = new TallyClient('test-key')
console.log(`TallyJS Version: ${client.getVersion()}`)
