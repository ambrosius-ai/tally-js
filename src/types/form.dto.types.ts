import { TallyPayloadDTO } from './payload.dto.types'

import { TallyFormStatus, TallyBlockTypes } from '@/lib'

/**
 * Type definitions for Tally form-related data structures
 * 
 * This module contains all type definitions related to Tally forms, including
 * form settings, blocks, and various DTOs for API requests and responses.
 * 
 * @category Form Types
 * @remarks
 * - All types follow the DTO pattern to match API request/response structures
 * - Form settings include various configuration options like submission limits and email notifications
 * - Form blocks represent the building blocks of a form (questions, text, etc.)
 * - Response DTOs include both simple and full form representations
 */
export type TallyFormSettingsDTO = {
  closeDate?: string // Maximum length: 12
  closeMessageDescription?: string
  closeMessageTitle?: string
  closeTime?: string // Maximum length: 12
  closeTimezone?: string // Maximum length: 256
  hasPartialSubmissions?: boolean // default false
  hasProgressBar?: boolean // default false
  hasRespondentEmailNotifications?: boolean // default false
  hasSelfEmailNotifications?: boolean // default false
  isClosed?: boolean // default false
  language?: string // Maximum length: 12
  pageAutoJump?: boolean // default false
  password?: string
  redirectOnCompletion?: string
  respondentEmailBody?: string
  respondentEmailFromName?: string
  respondentEmailReplyTo?: string
  respondentEmailSubject?: string
  respondentEmailTo?: string
  saveForLater?: boolean // default true
  selfEmailBody?: string
  selfEmailFromName?: string
  selfEmailReplyTo?: string
  selfEmailSubject?: string
  selfEmailTo?: string
  styles?: string
  submissionsDataRetentionDuration?: number // Required range: x > 0
  submissionsDataRetentionUnit?: string // Maximum length: 12
  submissionsLimit?: number // Required range: x > 0
  uniqueSubmissionKey?: string
}

/**
 * Type definition for payments associated to a form
 * 
 * @category Form Types
 */
export interface TallyPaymentsDTO {
  amount: number
  currency: string
}

/**
 * Type definition for the request payload to create a form
 * 
 * @category Form Types
 */
export interface TallyFormCreateDTO {
  blocks: TallyFormBlockDTO[]
  status: TallyFormStatus
  settings?: TallyFormSettingsDTO
  workspaceId?: string
  templateId?: string
}

/**
 * Type definition for the request payload to update a form
 * 
 * @category Form Types
 */ 
export interface TallyFormUpdateDTO {
  id: string
  blocks?: TallyFormBlockDTO[]
  name?: string
  settings?: TallyFormSettingsDTO
  status?: TallyFormStatus
}

/**
 * Type definition for the response payload after creating or updating a form
 * 
 * @category Form Types
 */
export type TallyFormSimpleResponseDTO = {
  createdAt: string
  id: string
  isClosed: boolean
  name: string
  numberOfSubmissions: number
  status: TallyFormStatus
  updatedAt: string
  workspaceId: string
  payments?: TallyPaymentsDTO[]
}

// Return type for the 
/**
 * Type definition for the getForm request, including the contents of the form as blocks
 * 
 * @category Form Types
 */
export interface TallyFormFullResponseDTO extends TallyFormSimpleResponseDTO {
  blocks?: TallyFormBlockDTO[]
  settings?: TallyFormSettingsDTO
}

/**
 * Extended domain model representing a form with additional functionality
 * 
 * @category Form Types
 */
export interface TallyForm extends TallyFormCreateDTO {
  addBlock(block: TallyFormBlockDTO): TallyForm
}

/**
 * Type definition for a form block
 * 
 * @category Form Types
 */
export interface TallyFormBlockDTO {
  groupType: TallyBlockTypes
  groupUuid: string
  type: TallyBlockTypes
  uuid: string
  payload?: TallyPayloadDTO
}
