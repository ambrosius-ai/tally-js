import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TallyFormService } from '../services'
import { HttpClient } from '../lib/httpClient'
import { TallyInvalidRequestError } from '../lib/errors'
import { TallyFormCreateDTO, TallyFormUpdateDTO } from '../types'
import { TallyBlockTypes, TallyFormStatus } from '../lib/constants'

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

  describe('create', () => {
    const validForm: TallyFormCreateDTO = {
      blocks: [
        {
          type: TallyBlockTypes.FORM_TITLE,
          groupType: TallyBlockTypes.FORM_TITLE,
          uuid: '1',
          groupUuid: '1',
          payload: {
            html: 'Test Form',
            button: {
              label: 'Submit'
            }
          }
        },
        {
          type: TallyBlockTypes.INPUT_TEXT,
          groupType: TallyBlockTypes.QUESTION,
          uuid: '2',
          groupUuid: '2',
          payload: {
            isRequired: true,
            name: 'name',
            placeholder: 'Enter your name'
          }
        },
        {
          type: TallyBlockTypes.INPUT_EMAIL,
          groupType: TallyBlockTypes.QUESTION,
          uuid: '3',
          groupUuid: '3',
          payload: {
            isRequired: true,
            name: 'email',
            placeholder: 'Enter your email'
          }
        }
      ],
      status: TallyFormStatus.DRAFT
    }

    it('should create a form successfully', async () => {
      const mockResponse = {
        data: {
          id: '123',
          name: 'Test Form',
          createdAt: '2025-02-13T17:30:00Z',
          updatedAt: '2025-02-13T17:30:00Z',
          isClosed: false,
          numberOfSubmissions: 0,
          status: TallyFormStatus.DRAFT,
          workspaceId: 'ws-123'
        },
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
      const mockError = { code: 'ERROR', message: 'API Error', __isTallyError: true }
      mockHttpClient.post.mockRejectedValue(mockError)

      const result = await formService.create(validForm)
      expect(result).toEqual({ data: null, error: mockError })
    })
  })

  describe('get', () => {
    it('should get a form successfully', async () => {
      const mockResponse = {
        data: {
          id: '123',
          name: 'Test Form',
          createdAt: '2025-02-13T17:30:00Z',
          updatedAt: '2025-02-13T17:30:00Z',
          isClosed: false,
          numberOfSubmissions: 0,
          status: TallyFormStatus.PUBLISHED,
          workspaceId: 'ws-123',
          blocks: [
            {
              type: TallyBlockTypes.FORM_TITLE,
              groupType: TallyBlockTypes.FORM_TITLE,
              uuid: '1',
              groupUuid: '1',
              payload: {
                html: 'Test Form',
                button: {
                  label: 'Submit'
                }
              }
            }
          ]
        },
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
        data: {
          items: [
            {
              id: '123',
              name: 'Test Form',
              createdAt: '2025-02-13T17:30:00Z',
              updatedAt: '2025-02-13T17:30:00Z',
              isClosed: false,
              numberOfSubmissions: 0,
              status: TallyFormStatus.PUBLISHED,
              workspaceId: 'ws-123'
            }
          ],
          total: 1
        },
        error: null,
      }
      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await formService.list()
      expect(result).toEqual(mockResponse)
      expect(mockHttpClient.get).toHaveBeenCalledWith('/forms')
    })

    it('should list forms with valid page parameter', async () => {
      const mockResponse = {
        data: {
          items: [],
          total: 0
        },
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
      const mockError = { code: 'ERROR', message: 'API Error', __isTallyError: true }
      mockHttpClient.get.mockRejectedValue(mockError)

      const result = await formService.list(1)
      expect(result).toEqual({ data: null, error: mockError })
    })
  })

  describe('update', () => {
    const validUpdateForm: TallyFormUpdateDTO = {
      id: '123',
      name: 'Updated Form',
      blocks: [
        {
          type: TallyBlockTypes.FORM_TITLE,
          groupType: TallyBlockTypes.FORM_TITLE,
          uuid: '1',
          groupUuid: '1',
          payload: {
            html: 'Updated Form',
            button: {
              label: 'Submit'
            }
          }
        }
      ],
      status: TallyFormStatus.PUBLISHED
    }

    it('should update a form successfully', async () => {
      const mockResponse = {
        data: {
          id: '123',
          name: 'Updated Form',
          createdAt: '2025-02-13T17:30:00Z',
          updatedAt: '2025-02-13T17:31:00Z',
          isClosed: false,
          numberOfSubmissions: 0,
          status: TallyFormStatus.PUBLISHED,
          workspaceId: 'ws-123'
        },
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
      const mockError = { code: 'ERROR', message: 'API Error', __isTallyError: true }
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

    it('should return error when formId is not provided', async () => {
      const result = await formService.delete('')
      expect(result.error).toBeInstanceOf(TallyInvalidRequestError)
      expect(result.error?.message).toBe('Missing request parameter: formId')
      expect(result.data).toBeNull()
    })

    it('should handle API error', async () => {
      const mockError = { code: 'ERROR', message: 'API Error', __isTallyError: true }
      mockHttpClient.delete.mockRejectedValue(mockError)

      const result = await formService.delete('123')
      expect(result).toEqual({ data: null, error: mockError })
    })
  })
})