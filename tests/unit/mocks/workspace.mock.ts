import { TallyWorkspaceResponseDTO } from '@/types'

export const mockWorkspaceResponse: { data: TallyWorkspaceResponseDTO; error: null } = {
  data: {
    id: 'ws-123',
    name: 'Test Workspace',
    members: [
      {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        email: 'john@example.com',
        avatarUrl: null,
        organizationId: 'org-123',
        isDeleted: false,
        hasTwoFactorEnabled: false,
        createdAt: '2025-02-13T17:30:00Z',
        updatedAt: '2025-02-13T17:30:00Z',
        subscriptionPlan: 'FREE',
      },
    ],
    invites: [
      {
        id: 'invite-123',
        email: 'jane@example.com',
        workspaceIds: ['ws-123'],
      },
    ],
    createdByUserId: 'user-123',
    createdAt: '2025-02-13T17:30:00Z',
    updatedAt: '2025-02-13T17:30:00Z',
  },
  error: null,
}

export const mockValidWorkspaceCreateRequest = {
  name: 'Test Workspace',
}

export const mockValidWorkspaceUpdateRequest = {
  name: 'Updated Workspace',
  id: 'ws-updated-123',
}

export const mockWorkspaceUpdateResponse = {
  data: {
    ...mockWorkspaceResponse.data,
    name: 'Updated Workspace',
    updatedAt: '2025-02-13T17:31:00Z',
  },
  error: null,
}

export const mockWorkspaceListResponse = {
  data: {
    items: [mockWorkspaceResponse.data],
    total: 1,
  },
  error: null,
}

export const mockEmptyWorkspaceListResponse = {
  data: {
    items: [],
    total: 0,
  },
  error: null,
}

export const mockWorkspaceDeleteResponse = {
  data: null,
  error: null,
}
