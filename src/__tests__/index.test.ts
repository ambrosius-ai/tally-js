import { describe, it, expect } from 'vitest'
import { TallyClient } from '../client'
import { TallyFormService } from '../services'

describe('TallyClient', () => {
  it('should create an instance with an API key', () => {
    const client = new TallyClient('tly-key', 'https://api.tally.so')
    expect(client).toBeInstanceOf(TallyClient)
    expect(client.forms).toBeInstanceOf(TallyFormService)
  })

  it('should handle empty API key', () => {
    expect(() => {
      new TallyClient('', 'https://api.tally.so')
    }).toThrow('Invalid API key: ')
  })

  it('should handle invalid API key prefix', () => {
    expect(() => {
      new TallyClient('invalidPrefix-abc', 'https://api.tally.so')
    }).toThrow('Invalid API key: invalidPrefix-abc')
  })

  it('should handle empty URL', () => {
    expect(() => {
      new TallyClient('tly-key', '')
    }).toThrow('Invalid base URL: ')
  })

  it('should handle invalid URL', () => {
    expect(() => {
      new TallyClient('tly-key', 'invalid-url')
    }).toThrow('Invalid base URL: invalid-url')
  })

  it('should create an instance with a valid URL', () => {
    const client = new TallyClient('tly-key', 'https://api.tally.so')
    expect(client).toBeInstanceOf(TallyClient)
  })
})
