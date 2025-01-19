import { describe, it, expect } from 'vitest'
import { TallyClient } from '../index'

describe('TallyClient', () => {
  it('should create an instance with an API key', () => {
    const client = new TallyClient('test-key')
    expect(client.getApiKey()).toBe('test-key')
  })

  it('should return the correct version', () => {
    const client = new TallyClient('test-key')
    expect(client.getVersion()).toBe('0.1.0')
  })
})
