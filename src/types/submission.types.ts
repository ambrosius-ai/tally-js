import { TallyBlockTypes } from '@/lib'

export interface TallySubmissionResponseDTO {
  questionId: string
  value: any
}

export interface TallySubmissionDTO {
  id: string
  formId: string
  isCompleted: boolean
  submittedAt: string
  responses: TallySubmissionResponseDTO[]
}

export interface TallyQuestionFieldDTO {
  uuid: string
  type: TallyBlockTypes
  blockGroupUuid: string
  title: string
}

export interface TallyQuestionDTO {
  id: string
  type: TallyBlockTypes
  title: string
  isTitleModifiedByUser: boolean
  formId: string
  isDeleted: boolean
  numberOfResponses: number
  createdAt: string
  updatedAt: string
  fields: TallyQuestionFieldDTO[]
}

export interface TallySubmissionListDTO {
  page: number
  limit: number
  hasMore: boolean
  totalNumberOfSubmissionsPerFilter: {
    all: number
    completed: number
    partial: number
  }
  questions: TallyQuestionDTO[]
  submissions: TallySubmissionDTO[]
}

export enum TallySubmissionRequestFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  PARTIAL = 'partial',
}

export interface TallySubmissionRequestDTO {
  formId: string
  page?: number
  filter?: TallySubmissionRequestFilter
  submissionId?: string
}
