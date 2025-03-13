/**
 * Type definitions for user-related data
 * 
 * This module contains type definitions for user information and related data structures.
 * These types are used to represent user data in the Tally API.
 * 
 * @category Types
 * @remarks
 * - Defines the structure of user profiles and their properties
 * - Includes subscription plan information
 * - Contains user authentication and security settings
 * - Provides timestamps for user creation and updates
 */
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
