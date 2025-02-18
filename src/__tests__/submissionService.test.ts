import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TallySubmissionService } from '../services'
import { HttpClient } from '../lib/httpClient'
import { TallyApiError, TallyInvalidRequestError, TallyUnknownError } from '../lib/errors'
import { TallySubmissionRequestFilter } from '../types/submission.types'

// Mock responses
const mockListResponse = {
  data: {
    page: 1,
    limit: 10,
    hasMore: false,
    totalNumberOfSubmissionsPerFilter: {
      all: 5,
      completed: 3,
      partial: 2,
    },
    questions: [],
    submissions: [],
  },
  error: null,
}

const mockDeleteResponse = {
  data: null,
  error: null,
}

// Mock HttpClient
const mockHttpClient = {
  post: vi.fn().mockResolvedValue({ data: null, error: null }),
  get: vi.fn().mockResolvedValue({ data: null, error: null }),
  patch: vi.fn().mockResolvedValue({ data: null, error: null }),
  delete: vi.fn().mockResolvedValue({ data: null, error: null }),
} as unknown as HttpClient

describe('TallySubmissionService', () => {
  let submissionService: TallySubmissionService

  beforeEach(() => {
    submissionService = new TallySubmissionService(mockHttpClient)
    vi.clearAllMocks()
  })

  describe('SubmissionService.list', () => {
    it('should list submissions with only formId', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockListResponse)

      const result = await submissionService.list({ formId: '123' })
      expect(result).toEqual(mockListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms/123/submissions?page=1')
    })

    it('should list submissions with custom page', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockListResponse)

      const result = await submissionService.list({ formId: '123', page: 2 })
      expect(result).toEqual(mockListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms/123/submissions?page=2')
    })

    it('should list submissions with filter', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockListResponse)

      const result = await submissionService.list({
        formId: '123',
        filter: TallySubmissionRequestFilter.COMPLETED,
      })
      expect(result).toEqual(mockListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/forms/123/submissions?page=1&filter=completed',
      )
    })

    it('should list submissions with submissionId', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockListResponse)

      const result = await submissionService.list({
        formId: '123',
        submissionId: 'sub456',
      })
      expect(result).toEqual(mockListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/forms/123/submissions?page=1&submissionId=sub456',
      )
    })

    it('should list submissions with all optional parameters', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockListResponse)

      const result = await submissionService.list({
        formId: '123',
        page: 3,
        filter: TallySubmissionRequestFilter.PARTIAL,
        submissionId: 'sub789',
      })
      expect(result).toEqual(mockListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/forms/123/submissions?page=3&filter=partial&submissionId=sub789',
      )
    })

    it('should throw error when options is not provided', async () => {
      await expect(submissionService.list(undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: options'),
      )
    })

    it('should throw error when formId is not provided', async () => {
      await expect(submissionService.list({} as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: formId'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await submissionService.list({ formId: '123' })
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await submissionService.list({ formId: '123' })
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      await expect(submissionService.list({ formId: '123' })).rejects.toThrow(mockError)
    })
  })

  describe('SubmissionService.delete', () => {
    it('should delete a submission successfully', async () => {
      mockHttpClient.delete = vi.fn().mockResolvedValue(mockDeleteResponse)

      const result = await submissionService.delete('123', 'sub456')
      expect(result).toEqual(mockDeleteResponse)
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/forms/123/submissions/sub456')
    })

    it('should throw error when formsId is not provided', async () => {
      await expect(submissionService.delete('', 'sub456')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: formsId'),
      )
    })

    it('should throw error when submissionId is not provided', async () => {
      await expect(submissionService.delete('123', '')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: submissionId'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      const result = await submissionService.delete('123', 'sub456')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      const result = await submissionService.delete('123', 'sub456')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      await expect(submissionService.delete('123', 'sub456')).rejects.toThrow(mockError)
    })
  })
})
