import { describe, it, expect } from 'vitest'
import { TallyClient } from '../../../dist'

describe('API Client Integration', () => {
  it('should successfully create client instance', () => {
    const tally = new TallyClient('tly-test-key', 'https://api.tally.so')
    expect(tally).toBeDefined()
  })

  it('should make a real API call', async () => {
    const apiKey = process.env.TALLY_API_KEY as string
    const tally = new TallyClient(apiKey, 'https://api.tally.so')

    const result = await tally.users.getMe()
    expect(result).toBeDefined()
    expect(result.data).toBeDefined()
    expect(result.error).toBeDefined()
    expect(result.data?.id).toBeDefined()
    // Add more specific assertions based on your API
  })
})
