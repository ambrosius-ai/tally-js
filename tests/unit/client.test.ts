import { describe, it, expect, vi } from 'vitest'
import { TallyClient } from '@/client'
import { TallyFormService } from '@/services'
import { FetchHttpClient } from '@/lib/httpClient'

vi.mock('@/lib/httpClient', () => ({
  FetchHttpClient: vi.fn(),
}))

describe('TallyClient', () => {
  it('should create an instance with an API key', () => {
    const apiKey = 'tly-key'
    const baseUrl = 'https://api.tally.so'
    const client = new TallyClient(apiKey, baseUrl)
    expect(client).toBeInstanceOf(TallyClient)
    expect(client.forms).toBeInstanceOf(TallyFormService)

    expect(FetchHttpClient).toHaveBeenCalledWith(baseUrl, {
      Authorization: `Bearer ${apiKey}`,
    })
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
  it('should create an instance with a valid version', () => {
    const client = new TallyClient('tly-key', 'https://api.tally.so', '2023-10-01')
    expect(client).toBeInstanceOf(TallyClient)
  })

  it('should handle invalid version format', () => {
    expect(() => {
      new TallyClient('tly-key', 'https://api.tally.so', 'v1')
    }).toThrow('Invalid version specified, expected yyyy-mm-dd, got this: v1')
  })

  it('should set version header when provided', () => {
    const apiKey = 'tly-key123'
    const baseUrl = 'https://api.tally.so'
    const version = '2023-10-01'

    new TallyClient(apiKey, baseUrl, version)

    expect(FetchHttpClient).toHaveBeenCalledWith(baseUrl, {
      Authorization: `Bearer ${apiKey}`,
      'tally-version': version,
    })
  })

  it('should not set version header when not provided', () => {
    const apiKey = 'tly-key123'
    const baseUrl = 'https://api.tally.so'

    new TallyClient(apiKey, baseUrl)

    expect(FetchHttpClient).toHaveBeenCalledWith(baseUrl, {
      Authorization: `Bearer ${apiKey}`,
    })
  })
})
