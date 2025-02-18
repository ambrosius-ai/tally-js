import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TallyUserService } from '../services/userService'
import { HttpClient, TallyError } from '../lib'
import { UserMock } from './mocks/user.mock'

// Mock HttpClient
const mockHttpClient = {
  post: vi.fn().mockResolvedValue({ data: null, error: null }),
  get: vi.fn().mockResolvedValue({ data: null, error: null }),
  patch: vi.fn().mockResolvedValue({ data: null, error: null }),
  delete: vi.fn().mockResolvedValue({ data: null, error: null }),
} as unknown as HttpClient

describe('TallyUserService', () => {
  let userService: TallyUserService

  beforeEach(() => {
    userService = new TallyUserService(mockHttpClient)
    vi.clearAllMocks()
  })

  it('should return user data when getMe is successful', async () => {
    mockHttpClient.get = vi.fn().mockResolvedValue({ ...UserMock })

    const result = await userService.getMe()
    expect(mockHttpClient.get).toHaveBeenCalledWith('/users/me')
    expect(result).toEqual(UserMock)
  })

  it('should return an error when getMe fails', async () => {
    const mockError: TallyError = new TallyError('Error fetching user')
    mockHttpClient.get = vi.fn().mockRejectedValue(mockError)

    const result = await userService.getMe()

    expect(result.data).toBeNull()
    expect(result.error).toEqual(mockError)
  })
})
