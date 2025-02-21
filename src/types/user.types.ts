export interface TallyUserDTO {
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
