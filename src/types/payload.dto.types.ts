export type TallyPayloadDTO =
  | TallyPayloadLayoutDTO
  | TallyPayloadDividerDTO
  | TallyPayloadFormTitleDTO
  | TallyPayloadTextDTO
  | TallyPayloadLabelDTO
  | TallyPayloadHeadingDTO
  | TallyPayloadTitleDTO
  | TallyPayloadPageBreakDTO
  | TallyPayloadThankYouPageDTO
  | TallyPayloadImageDTO
  | TallyPayloadEmbedDTO
  | TallyPayloadEmbedAudioDTO
  | TallyPayloadEmbedVideoDTO
  | null

export interface TallyPayloadLayoutDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
}

export interface TallyPayloadDividerDTO extends TallyPayloadLayoutDTO {}

export interface TallyPayloadFormTitleDTO {
  button?: {
    label: string
  }
  cover?: string
  coverSettings?: {
    objectPositionYPercent: number
  }
  html?: string
  logo?: string
  mentions?: object
}

export interface TallyPayloadTextDTO extends TallyPayloadLayoutDTO {
  html: string
}

export interface TallyPayloadLabelDTO extends TallyPayloadTextDTO {
  isFolded: boolean
}

/** same payload for H1, H2, H3 */
export interface TallyPayloadHeadingDTO extends TallyPayloadLayoutDTO {
  html: string
}

export interface TallyPayloadTitleDTO extends TallyPayloadTextDTO {
  isFolded: boolean
}

export interface TallyPayloadPageBreakDTO {
  index: number
  isFirst: boolean
  isLast: boolean
  isQualifiedForThankYouPage: boolean
  isThankYouPage: boolean
}

export interface TallyPayloadThankYouPageDTO {
  isHidden: boolean
  isThankYouPage: boolean
}

export interface TallyPayloadImageDTO extends TallyPayloadLayoutDTO {
  alt: string
  height: number
  url: string
  width: number
}

export interface TallyPayloadEmbedDTO extends TallyPayloadLayoutDTO {
  display?: {
    url: string
  }
  height?: string
  inputUrl?: string
  provider?: string
  title?: string
  type?: 'rich' | 'video' | 'photo' | 'link' | 'pdf' | 'gist' | 'image/*' | 'video/*' | 'audio/*'
  width?: string
}
export interface TallyPayloadEmbedAudioDTO extends TallyPayloadLayoutDTO {
  provider: string
  url: string
}

export type TallyPayloadEmbedVideoDTO = TallyPayloadEmbedAudioDTO
