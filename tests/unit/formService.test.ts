import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TallyFormService } from '@/services'
import { HttpClient } from '@/lib/httpClient'
import { TallyApiError, TallyInvalidRequestError, TallyUnknownError } from '@/lib/errors'
import {
  mockSimpleResponse,
  mockValidFormRequest,
  mockGetResponse,
  mockListResponse,
  mockEmptyListResponse,
  mockUpdateResponse,
  mockValidUpdateRequest,
  mockDeleteResponse,
} from './mocks'

// Mock HttpClient
const mockHttpClient = {
  post: vi.fn().mockResolvedValue({ data: null, error: null }),
  get: vi.fn().mockResolvedValue({ data: null, error: null }),
  patch: vi.fn().mockResolvedValue({ data: null, error: null }),
  delete: vi.fn().mockResolvedValue({ data: null, error: null }),
} as unknown as HttpClient

describe('TallyFormService', () => {
  let formService: TallyFormService

  beforeEach(() => {
    formService = new TallyFormService(mockHttpClient)
    vi.clearAllMocks()
  })

  describe('FormService.create', () => {
    it('should create a form successfully', async () => {
      mockHttpClient.post = vi.fn().mockResolvedValue(mockSimpleResponse)
      // mutations to the mocked object are recognized this way
      const fixMockSimpleResponse = { ...mockSimpleResponse }

      const result = await formService.create(mockValidFormRequest)
      expect(result).toEqual(fixMockSimpleResponse)
      expect(mockHttpClient.post).toHaveBeenCalledWith('/forms', mockValidFormRequest)
    })

    it('should throw error when form is not provided', async () => {
      await expect(formService.create(undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: form'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      const result = await formService.create(mockValidFormRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unkown Api Error for Test', new Error('Test'))
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      const result = await formService.create(mockValidFormRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      await expect(formService.create(mockValidFormRequest)).rejects.toThrow(mockError)
    })
  })

  describe('FormService.get', () => {
    it('should get a form successfully', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockGetResponse)

      const result = await formService.get('123')
      expect(result).toEqual(mockGetResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms/123')
    })

    it('should throw error when formId is not provided', async () => {
      await expect(formService.get('')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: formId'),
      )
    })

    it('should handle API error', async () => {
      const mockError = { code: 'ERROR', message: 'Internal Server error', __isTallyError: true }
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await formService.get('123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = {
        code: 'ERROR',
        message: 'Unknown Api Error for Test',
        __isTallyError: true,
      }
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await formService.get('123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      await expect(formService.get('123')).rejects.toThrow(mockError)
    })
  })

  describe('FormService.list', () => {
    it('should list forms without page parameter', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockListResponse)

      const result = await formService.list()
      expect(result).toEqual(mockListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms')
    })

    it('should list forms with valid page parameter', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockEmptyListResponse)

      const result = await formService.list(2)
      expect(result).toEqual(mockEmptyListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms?page=2')
    })

    it('should throw error when page is not an integer', async () => {
      await expect(formService.list(1.5)).rejects.toThrow(
        new TallyInvalidRequestError('Page parameter must be an integer'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await formService.list(1)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await formService.list(1)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      await expect(formService.list(1)).rejects.toThrow(mockError)
    })
  })

  describe('FormService.update', () => {
    it('should update a form successfully', async () => {
      mockHttpClient.patch = vi.fn().mockResolvedValue(mockUpdateResponse)

      const result = await formService.update(mockValidUpdateRequest)
      expect(result).toEqual(mockUpdateResponse)
      expect(mockHttpClient.patch).toHaveBeenCalledWith('/forms/123', mockValidUpdateRequest)
    })

    it('should throw error when form is not provided', async () => {
      await expect(formService.update(undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request parameters: form'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      const result = await formService.update(mockValidUpdateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      const result = await formService.update(mockValidUpdateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      await expect(formService.update(mockValidUpdateRequest)).rejects.toThrow(mockError)
    })
  })

  describe('FormService.delete', () => {
    it('should delete a form successfully', async () => {
      mockHttpClient.delete = vi.fn().mockResolvedValue(mockDeleteResponse)

      const result = await formService.delete('123')
      expect(result).toEqual(mockDeleteResponse)
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/forms/123')
    })

    it('should throw error when formId is not provided', async () => {
      await expect(formService.delete('')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request parameter: formId'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      const result = await formService.delete('123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      const result = await formService.delete('123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      await expect(formService.delete('123')).rejects.toThrow(mockError)
    })
  })
})
