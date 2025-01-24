import {
  ITallyBlock,
  ITallyLayoutPayload,
  ITallyTextOrHeadingPayload,
} from './TallyBlockTypesInterfaces'

export class TallyBlock implements ITallyBlock {
  groupType: any
  groupUuid: string
  type: any
  uuid: string
  payload?: ITallyLayoutPayload

  constructor(
    groupType: any,
    groupUuid: string,
    type: any,
    uuid: string,
    payload?: ITallyLayoutPayload,
  ) {
    this.groupType = groupType
    this.groupUuid = groupUuid
    this.type = type
    this.uuid = uuid
    this.payload = payload
  }
}
export class TallyTextPayload implements ITallyTextOrHeadingPayload {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
  html: string

  constructor(
    columnListUuid: string,
    columnRatio: number,
    columnUuid: string,
    isHidden: boolean,
    html: string,
  ) {
    this.columnListUuid = columnListUuid
    this.columnRatio = columnRatio
    this.columnUuid = columnUuid
    this.isHidden = isHidden
    this.html = html
  }
}
