/**
 * Type definitions for workspace-related data
 * 
 * This module contains type definitions for workspaces, including
 * workspace members, invites, and related data structures.
 * 
 * @category Types
 * @remarks
 * - Defines the structure of workspaces and their properties
 * - Includes types for workspace members and their roles
 * - Supports workspace invitations and member management
 * - Provides DTOs for creating, updating, and managing workspaces
 */
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

/**
 * @category Workspace Types
 */

export interface TallyWorkspaceInviteDTO {
  id: string
  email: string
  workspaceIds: string[]
}

/**
 * @category Workspace Types
 */
export interface TallyWorkspaceResponseDTO {
  id: string
  name: string
  members: TallyWorkspaceMemberDTO[]
  invites: TallyWorkspaceInviteDTO[]
  createdByUserId: string
  createdAt: string
  updatedAt: string
}

/**
 * @category Workspace Types
 */
export interface TallyWorkspaceCreateDTO {
  name: string
}

/**
 * @category Workspace Types
 */
export interface TallyWorkspaceUpdateDTO {
  id: string
  name: string

}