// tests/integration/cjs/client.test.cjs
const { describe, it, expect } = await import('vitest')
const TallyClient = require('tally-js') // Note the .default here

describe('API Client Integration (CommonJS)', () => {
  it('should successfully create client instance', () => {
    const tally = new TallyClient('tly-test-key', 'https://api.tally.so')
    expect(tally).toBeDefined()
  })

  it('should make a real API call', async () => {
    const apiKey = process.env.TALLY_API_KEY
    const tally = new TallyClient(apiKey, 'https://api.tally.so')

    const result = await tally.users.getMe()
    expect(result).toBeDefined()
    expect(result.data).toBeDefined()
    expect(result.error).toBeDefined()
    expect(result.data?.id).toBeDefined()
  })
})
