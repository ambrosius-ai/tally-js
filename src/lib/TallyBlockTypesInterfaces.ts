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

export interface ITallyBlock {
  groupType: any
  groupUuid: string
  type: any
  uuid: string
  payload?:
    | ITallyLayoutPayload
    | ITallyDividerPayload
    | ITallyTextOrHeadingPayload
    | ITallyLabelOrTitlePayload
}
