export interface Options {
  authToken: string;
  blockId: string; // UUID
  name: string;
  token: string; // Tally.so API token
}

export enum FormStatus {
  BLANK = 'BLANK',
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

export enum BlockType {
  FORM_TITLE = 'FORM_TITLE',
  // Add other block types as needed
}

export enum QuestionType {
  FORM_TITLE = 'FORM_TITLE',
  INPUT_FIELD = 'INPUT_FIELD',
  // Add other question types as needed
}

export enum CalculatedFieldType {
  NUMBER = 'NUMBER',
  TEXT = 'TEXT',
  // Add other field types as needed
}

export enum DataRetentionUnit {
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS'
}

export interface Field {
  uuid: string;
  type: string;
  questionType: QuestionType;
  blockGroupUuid: string;
  title: string;
  calculatedFieldType: CalculatedFieldType;
}

export interface Mention {
  uuid: string;
  field: Field;
  defaultValue: any;
}

export interface CoverSettings {
  objectPositionYPercent: number;
}

export interface ButtonSettings {
  label: string;
}

export interface FormBlock {
  uuid: string;
  type: BlockType;
  groupUuid: string;
  groupType: BlockType;
  payload: {
    html?: string;
    logo?: string;
    cover?: string;
    coverSettings?: CoverSettings;
    mentions?: Mention[];
    button?: ButtonSettings;
  };
}

export interface FormSettings {
  language?: string;
  isClosed: boolean;
  closeMessageTitle?: string;
  closeMessageDescription?: string;
  closeTimezone?: string;
  closeDate?: string;
  closeTime?: string;
  submissionsLimit?: number;
  uniqueSubmissionKey?: string;
  redirectOnCompletion?: string;
  hasSelfEmailNotifications: boolean;
  selfEmailTo?: string;
  selfEmailReplyTo?: string;
  selfEmailSubject?: string;
  selfEmailFromName?: string;
  selfEmailBody?: string;
  hasRespondentEmailNotifications: boolean;
  respondentEmailTo?: string;
  respondentEmailReplyTo?: string;
  respondentEmailSubject?: string;
  respondentEmailFromName?: string;
  respondentEmailBody?: string;
  hasProgressBar: boolean;
  hasPartialSubmissions: boolean;
  pageAutoJump: boolean;
  saveForLater: boolean;
  styles?: string;
  password?: string;
  submissionsDataRetentionDuration?: number;
  submissionsDataRetentionUnit?: DataRetentionUnit;
}

export interface BaseFormFields {
  workspaceId?: string;
  templateId?: string;
  status: FormStatus;
  blocks: FormBlock[];
  settings: FormSettings;
}

export interface TallyForm extends BaseFormFields {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateFormRequest = BaseFormFields;

export type UpdateFormRequest = Partial<BaseFormFields>;
