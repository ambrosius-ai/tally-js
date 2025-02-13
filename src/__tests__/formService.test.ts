import { describe, it, expect, vi } from 'vitest'
import { TallyFormService } from '../services'
import { HttpClient } from '../lib/httpClient'
import { TallyInvalidRequestError } from '../lib/errors'
import { TallyFormCreateDTO, TallyFormUpdateDTO } from '../types'

// Mock HttpClient
const mockHttpClient = {
  post: vi.fn(),
  get: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
} as unknown as HttpClient

describe('TallyFormService', () => {
  let formService: TallyFormService

  beforeEach(() => {
    formService = new TallyFormService(mockHttpClient)
    vi.clearAllMocks()
  })

  describe('create', () => {
    const validForm: TallyFormCreateDTO = {
      name: 'Test Form',
      fields: [{ name: 'field1', type: 'text' }],
    }

    it('should create a form successfully', async () => {
      const mockResponse = {
        data: { id: '123', name: 'Test Form' },
        error: null,
      }
      mockHttpClient.post.mockResolvedValue(mockResponse)

      const result = await formService.create(validForm)
      expect(result).toEqual(mockResponse)
      expect(mockHttpClient.post).toHaveBeenCalledWith('/forms', validForm)
    })

    it('should throw error when form is not provided', async () => {
      await expect(formService.create(undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: form')
      )
    })

    it('should handle API error', async () => {
      const mockError = { code: 'ERROR', message: 'API Error' }
      mockHttpClient.post.mockRejectedValue(mockError)

      const result = await formService.create(validForm)
      expect(result).toEqual({ data: null, error: mockError })
    })
  })

  describe('get', () => {
    it('should get a form successfully', async () => {
      const mockResponse = {
        data: { id: '123', name: 'Test Form' },
        error: null,
      }
      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await formService.get('123')
      expect(result).toEqual(mockResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms/123')
    })

    it('should throw error when formId is not provided', async () => {
      await expect(formService.get('')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: formId')
      )
    })
  })

  describe('list', () => {
    it('should list forms without page parameter', async () => {
      const mockResponse = {
        data: { items: [], total: 0 },
        error: null,
      }
      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await formService.list()
      expect(result).toEqual(mockResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms')
    })

    it('should list forms with valid page parameter', async () => {
      const mockResponse = {
        data: { items: [], total: 0 },
        error: null,
      }
      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await formService.list(2)
      expect(result).toEqual(mockResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms?page=2')
    })

    it('should throw error when page is not an integer', async () => {
      await expect(formService.list(1.5)).rejects.toThrow(
        new TallyInvalidRequestError('Page parameter must be an integer')
      )
    })

    it('should handle API error', async () => {
      const mockError = { code: 'ERROR', message: 'API Error' }
      mockHttpClient.get.mockRejectedValue(mockError)

      const result = await formService.list(1)
      expect(result).toEqual({ data: null, error: mockError })
    })
  })

  describe('update', () => {
    const validUpdateForm: TallyFormUpdateDTO = {
      id: '123',
      name: 'Updated Form',
    }

    it('should update a form successfully', async () => {
      const mockResponse = {
        data: { id: '123', name: 'Updated Form' },
        error: null,
      }
      mockHttpClient.patch.mockResolvedValue(mockResponse)

      const result = await formService.update(validUpdateForm)
      expect(result).toEqual(mockResponse)
      expect(mockHttpClient.patch).toHaveBeenCalledWith('/forms/123', validUpdateForm)
    })

    it('should throw error when form is not provided', async () => {
      await expect(formService.update(undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request parameters: form')
      )
    })

    it('should handle API error', async () => {
      const mockError = { code: 'ERROR', message: 'API Error' }
      mockHttpClient.patch.mockRejectedValue(mockError)

      const result = await formService.update(validUpdateForm)
      expect(result).toEqual({ data: null, error: mockError })
    })
  })

  describe('delete', () => {
    it('should delete a form successfully', async () => {
      const mockResponse = {
        data: null,
        error: null,
      }
      mockHttpClient.delete.mockResolvedValue(mockResponse)

      const result = await formService.delete('123')
      expect(result).toEqual(mockResponse)
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/forms/123')
    })

    it('should throw error when formId is not provided', async () => {
      await expect(formService.delete('')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request parameter: formId')
      )
    })

    it('should handle API error', async () => {
      const mockError = { code: 'ERROR', message: 'API Error' }
      mockHttpClient.delete.mockRejectedValue(mockError)

      const result = await formService.delete('123')
      expect(result).toEqual({ data: null, error: mockError })
    })
  })
})