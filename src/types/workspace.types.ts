export interface TallyWorkspaceMemberDTO {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  avatarUrl: string | null
  organizationId: string
  isDeleted: boolean
  hasTwoFactorEnabled: boolean
  createdAt: string
  updatedAt: string
  subscriptionPlan: 'FREE' | 'PRO' | 'BUSINESS'
}

export interface TallyWorkspaceInviteDTO {
  id: string
  email: string
  workspaceIds: string[]
}

export interface TallyWorkspaceResponseDTO {
  id: string
  name: string
  members: TallyWorkspaceMemberDTO[]
  invites: TallyWorkspaceInviteDTO[]
  createdByUserId: string
  createdAt: string
  updatedAt: string
}

export interface TallyWorkspaceCreateDTO {
  name: string
}

export interface TallyWorkspaceUpdateDTO {
  name: string
}
