import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TallyWorkspaceService } from '../services'
import { HttpClient } from '../lib/httpClient'
import { TallyApiError, TallyInvalidRequestError, TallyUnknownError } from '../lib/errors'
import {
  mockWorkspaceResponse,
  mockValidWorkspaceCreateRequest,
  mockWorkspaceListResponse,
  mockEmptyWorkspaceListResponse,
  mockWorkspaceUpdateResponse,
  mockValidWorkspaceUpdateRequest,
  mockWorkspaceDeleteResponse,
} from './mocks'

// Mock HttpClient
const mockHttpClient = {
  post: vi.fn().mockResolvedValue({ data: null, error: null }),
  get: vi.fn().mockResolvedValue({ data: null, error: null }),
  patch: vi.fn().mockResolvedValue({ data: null, error: null }),
  delete: vi.fn().mockResolvedValue({ data: null, error: null }),
} as unknown as HttpClient

describe('TallyWorkspaceService', () => {
  let workspaceService: TallyWorkspaceService

  beforeEach(() => {
    workspaceService = new TallyWorkspaceService(mockHttpClient)
    vi.clearAllMocks()
  })

  describe('WorkspaceService.create', () => {
    it('should create a workspace successfully', async () => {
      mockHttpClient.post = vi.fn().mockResolvedValue(mockWorkspaceResponse)
      const fixMockWorkspaceResponse = { ...mockWorkspaceResponse }

      const result = await workspaceService.create(mockValidWorkspaceCreateRequest)
      expect(result).toEqual(fixMockWorkspaceResponse)
      expect(mockHttpClient.post).toHaveBeenCalledWith('/workspaces', mockValidWorkspaceCreateRequest)
    })

    it('should throw error when workspace is not provided', async () => {
      await expect(workspaceService.create(undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: workspace'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.create(mockValidWorkspaceCreateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.create(mockValidWorkspaceCreateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.post = vi.fn().mockRejectedValue(mockError)

      await expect(workspaceService.create(mockValidWorkspaceCreateRequest)).rejects.toThrow(mockError)
    })
  })

  describe('WorkspaceService.get', () => {
    it('should get a workspace successfully', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockWorkspaceResponse)

      const result = await workspaceService.get('ws-123')
      expect(result).toEqual(mockWorkspaceResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/workspaces/ws-123')
    })

    it('should throw error when workspaceId is not provided', async () => {
      await expect(workspaceService.get('')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request param: workspaceId'),
      )
    })

    it('should handle API error', async () => {
      const mockError = { code: 'ERROR', message: 'Internal Server error', __isTallyError: true }
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.get('ws-123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = {
        code: 'ERROR',
        message: 'Unknown Api Error for Test',
        __isTallyError: true,
      }
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.get('ws-123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      await expect(workspaceService.get('ws-123')).rejects.toThrow(mockError)
    })
  })

  describe('WorkspaceService.list', () => {
    it('should list workspaces without page parameter', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockWorkspaceListResponse)

      const result = await workspaceService.list()
      expect(result).toEqual(mockWorkspaceListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/workspaces')
    })

    it('should list workspaces with valid page parameter', async () => {
      mockHttpClient.get = vi.fn().mockResolvedValue(mockEmptyWorkspaceListResponse)

      const result = await workspaceService.list(2)
      expect(result).toEqual(mockEmptyWorkspaceListResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/workspaces?page=2')
    })

    it('should throw error when page is not an integer', async () => {
      await expect(workspaceService.list(1.5)).rejects.toThrow(
        new TallyInvalidRequestError('Page parameter must be an integer'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.list(1)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.list(1)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

      await expect(workspaceService.list(1)).rejects.toThrow(mockError)
    })
  })

  describe('WorkspaceService.update', () => {
    it('should update a workspace successfully', async () => {
      mockHttpClient.patch = vi.fn().mockResolvedValue(mockWorkspaceUpdateResponse)

      const result = await workspaceService.update('ws-123', mockValidWorkspaceUpdateRequest)
      expect(result).toEqual(mockWorkspaceUpdateResponse)
      expect(mockHttpClient.patch).toHaveBeenCalledWith(
        '/workspaces/ws-123',
        mockValidWorkspaceUpdateRequest,
      )
    })

    it('should throw error when workspaceId is not provided', async () => {
      await expect(workspaceService.update('', mockValidWorkspaceUpdateRequest)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request parameter: workspaceId'),
      )
    })

    it('should throw error when workspace is not provided', async () => {
      await expect(workspaceService.update('ws-123', undefined as any)).rejects.toThrow(
        new TallyInvalidRequestError('Missing request parameters: workspace'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.update('ws-123', mockValidWorkspaceUpdateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.update('ws-123', mockValidWorkspaceUpdateRequest)
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.patch = vi.fn().mockRejectedValue(mockError)

      await expect(
        workspaceService.update('ws-123', mockValidWorkspaceUpdateRequest),
      ).rejects.toThrow(mockError)
    })
  })

  describe('WorkspaceService.delete', () => {
    it('should delete a workspace successfully', async () => {
      mockHttpClient.delete = vi.fn().mockResolvedValue(mockWorkspaceDeleteResponse)

      const result = await workspaceService.delete('ws-123')
      expect(result).toEqual(mockWorkspaceDeleteResponse)
      expect(mockHttpClient.delete).toHaveBeenCalledWith('/workspaces/ws-123')
    })

    it('should throw error when workspaceId is not provided', async () => {
      await expect(workspaceService.delete('')).rejects.toThrow(
        new TallyInvalidRequestError('Missing request parameter: workspaceId'),
      )
    })

    it('should handle API error', async () => {
      const mockError = new TallyApiError('Internal Server error', 500)
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.delete('ws-123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any API error, even unknowns', async () => {
      const mockError = new TallyUnknownError('Unknown Api Error for Test', new Error('Test'))
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      const result = await workspaceService.delete('ws-123')
      expect(result).toEqual({ data: null, error: mockError })
    })

    it('should handle any unknown error', async () => {
      const mockError = new Error('Unknown error')
      mockHttpClient.delete = vi.fn().mockRejectedValue(mockError)

      await expect(workspaceService.delete('ws-123')).rejects.toThrow(mockError)
    })
  })
})