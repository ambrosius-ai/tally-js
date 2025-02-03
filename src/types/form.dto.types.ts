import { TallyPayloadDTO } from './payload.dto.types'

import { TallyFormStatus, TallyBlockTypes } from '../lib'
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

export interface TallyFormCreateDTO {
  blocks: TallyFormBlockDTO[]
  status: TallyFormStatus
  settings?: TallyFormSettingsDTO
  workspaceId?: string
  templateId?: string
}

export interface TallyFormUpdateDTO {
  id: string
  blocks?: TallyFormBlockDTO[]
  name?: string
  settings?: TallyFormSettingsDTO
  status?: TallyFormStatus
}

// Used for createForm, updateForm
export type TallyFormSimpleResponseDTO = {
  createdAt: string
  id: string
  isClosed: boolean
  name: string
  numberOfSubmissions: number
  status: TallyFormStatus
  updatedAt: string
  workspaceId: string
  payments?: any
}

// Return type for the getForm request, including the contents of the form as blocks
export interface TallyFormFullResponseDTO extends TallyFormSimpleResponseDTO {
  blocks?: TallyFormBlockDTO
  settings?: TallyFormSettingsDTO
}

// extended domain model to reprent a form with additional functionality
export interface TallyForm extends TallyFormCreateDTO {
  addBlock(block: TallyFormBlockDTO): TallyForm
}

export interface TallyFormBlockDTO {
  groupType: TallyBlockTypes
  groupUuid: string
  type: TallyBlockTypes
  uuid: string
  payload?: TallyPayloadDTO
}

export interface TallyFormListDTO {
  hasMore: boolean
  items: TallyFormSimpleResponseDTO[]
  limit: number
  page: number
  total: number
}
