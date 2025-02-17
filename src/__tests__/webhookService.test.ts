import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TallyWebhookService } from '../services'
import { HttpClient } from '../lib/httpClient'
import { TallyApiError, TallyInvalidRequestError, TallyUnknownError } from '../lib/errors'
import {
  mockWebhookCreateRequest,
  mockWebhookUpdateRequest,
  mockWebhookResponse,
  mockWebhookUpdateResponse,
} from './mocks/webhook.mock'

// Mock HttpClient
const mockHttpClient = {
  post: vi.fn().mockResolvedValue({ data: null, error: null }),
  get: vi.fn().mockResolvedValue({ data: null, error: null }),
  patch: vi.fn().mockResolvedValue({ data: null, error: null }),
  delete: vi.fn().mockResolvedValue({ data: null, error: null }),
} as unknown as HttpClient

describe('TallyWebhookService', () => {
  let webhookService: TallyWebhookService

  beforeEach(() => {
    webhookService = new TallyWebhookService(mockHttpClient)
    vi.clearAllMocks()
  })

  describe('WebhookService.create', () => {
    it('should create a webhook successfully', async () => {
      // mutations to the mocked object are recognized this way
      mockHttpClient.post = vi.fn().mockResolvedValue({ ...mockWebhookResponse })
      const result = await webhookService.create(mockWebhookCreateRequest)
      expect(result).toEqual(mockWebhookResponse)
      expect(mockHttpClient.post).toHaveBeenCalledWith('/webhooks', mockWebhookCreateRequest)
    })

    it('should throw error when webhook is not provided', async () => {
      await expect(webhookService.create(undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: webhook'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      const result = await webhookService.create(mockWebhookCreateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      const result = await webhookService.create(mockWebhookCreateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should throw any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      await expect(webhookService.create(mockWebhookCreateRequest)).rejects.toThrow(mockError)
    })
  })

  describe('WebhookService.update', () => {
    it('should update a webhook successfully', async () => {
      mockHttpClient.patch = vi.fn().mockResolvedValue({ ...mockWebhookUpdateResponse })

      const result = await webhookService.update(mockWebhookUpdateRequest)
      expect(result).toEqual(mockWebhookUpdateResponse)
      expect(mockHttpClient.patch).toHaveBeenCalledWith(
        `/webhooks/${mockWebhookUpdateRequest.id}`,
        mockWebhookUpdateRequest,
      )
    })

    it('should throw error when webhook is not provided', async () => {
      await expect(webhookService.update(undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: webhook'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      const result = await webhookService.update(mockWebhookUpdateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      const result = await webhookService.update(mockWebhookUpdateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      await expect(webhookService.update(mockWebhookUpdateRequest)).rejects.toThrow(mockError)
    })
  })

  describe('WebhookService.delete', () => {
    it('should delete a webhook successfully', async () => {
      const mockDeleteResponse = { data: null, error: null }
      mockHttpClient.delete = vi.fn().mockResolvedValue(mockDeleteResponse)

      const result = await webhookService.delete('123')
      expect(result).toEqual(mockDeleteResponse)
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/webhooks/123')
    })

    it('should throw error when webhookId is not provided', async () => {
      await expect(webhookService.delete('')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: webhookId'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      const result = await webhookService.delete('123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      const result = await webhookService.delete('123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      await expect(webhookService.delete('123')).rejects.toThrow(mockError)
    })
  })
})
