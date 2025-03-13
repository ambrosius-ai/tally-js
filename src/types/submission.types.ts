import { TallyBlockTypes } from '@/lib'

/**
 * Type definitions for form submissions
 * 
 * This module contains type definitions for form submissions, including
 * submission responses, questions, and related data structures.
 * 
 * @category Submission Types
 * @remarks
 * - Defines the structure of form submissions and their responses
 * - Includes types for questions and their fields
 * - Provides filtering options for submission requests
 * - Supports pagination and filtering of submissions
 */
export interface TallySubmissionResponseDTO {
  questionId: string
  value: any
}

/**
 * @category Submission Types
 */
export interface TallySubmissionDTO {
  id: string
  formId: string
  isCompleted: boolean
  submittedAt: string
  responses: TallySubmissionResponseDTO[]
}

/**
 * @category Submission Types
 */
export interface TallyQuestionFieldDTO {
  uuid: string
  type: TallyBlockTypes
  blockGroupUuid: string
  title: string
}

/**
 * @category Submission Types
 */
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

/**
 * @category Submission Types
 */
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

/**
 * @category Submission Types
 */
export enum TallySubmissionRequestFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  PARTIAL = 'partial',
}

/**
 * @category Submission Types
 */
export interface TallySubmissionRequestDTO {
  formId: string
  page?: number
  filter?: TallySubmissionRequestFilter
  submissionId?: string
}
