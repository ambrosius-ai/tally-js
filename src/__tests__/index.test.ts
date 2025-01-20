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

  it('should handle empty API key', () => {
    const client = new TallyClient('')
    expect(client.getApiKey()).toBe('')
  })

  it('should handle API key with special characters', () => {
    const specialKey = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const client = new TallyClient(specialKey)
    expect(client.getApiKey()).toBe(specialKey)
  })

  it('should maintain separate API keys for different instances', () => {
    const client1 = new TallyClient('key1')
    const client2 = new TallyClient('key2')
    
    expect(client1.getApiKey()).toBe('key1')
    expect(client2.getApiKey()).toBe('key2')
    expect(client1.getVersion()).toBe(client2.getVersion())
  })
})
