import { TallyBlockTypes, TallyFormStatus } from '../lib/constants'

export interface ITallyLayoutPayload {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
}

export interface ITallyDividerPayload extends ITallyLayoutPayload {}

export interface ITallyTextOrHeadingPayload extends ITallyLayoutPayload {
  html: string
}

export interface ITallyLabelOrTitlePayload extends ITallyTextOrHeadingPayload {
  isFolded: boolean
}

export interface TallyFormBlockDTO {
  groupType: TallyBlockTypes
  groupUuid: string
  type: TallyBlockTypes
  uuid: string
  payload?:
    | ITallyLayoutPayload
    | ITallyDividerPayload
    | ITallyTextOrHeadingPayload
    | ITallyLabelOrTitlePayload
}

export type TallyFormSettingsDTO = {}

export interface TallyFormDTO {
  // id: string // response
  blocks: TallyFormBlockDTO[]
  status: TallyFormStatus
  settings?: TallyFormSettingsDTO
  workspaceId?: string
  templateId?: string
}

export interface TallyForm extends TallyFormDTO {
  addBlock(block: TallyFormBlockDTO): TallyForm
}
