export type TallyPayloadDTO =
  | TallyPayloadFormTitleDTO
  | TallyPayloadTextDTO
  | TallyPayloadLabelDTO
  | TallyPayloadTitleDTO
  | TallyPayloadHeading1DTO
  | TallyPayloadHeading2DTO
  | TallyPayloadHeading3DTO
  | TallyPayloadDividerDTO
  | TallyPayloadPageBreakDTO
  | TallyPayloadThankYouPageDTO
  | TallyPayloadImageDTO
  | TallyPayloadEmbedDTO
  | TallyPayloadEmbedVideoDTO
  | TallyPayloadEmbedAudioDTO
  | TallyPayloadQuestionDTO
  | TallyPayloadMultipleChoiceDTO
  | TallyPayloadCheckboxesDTO
  | TallyPayloadDropdownDTO
  | TallyPayloadRankingDTO
  | TallyPayloadMatrixDTO
  | TallyPayloadMultiSelectDTO
  | TallyPayloadInputTextDTO
  | TallyPayloadInputNumberDTO
  | TallyPayloadInputEmailDTO
  | TallyPayloadInputLinkDTO
  | TallyPayloadInputPhoneNumberDTO
  | TallyPayloadInputDateDTO
  | TallyPayloadInputTimeDTO
  | TallyPayloadTextareaDTO
  | TallyPayloadFileUploadDTO
  | TallyPayloadLinearScaleDTO
  | TallyPayloadRatingDTO
  | TallyPayloadHiddenFieldsDTO
  | TallyPayloadMultipleChoiceOptionDTO
  | TallyPayloadCheckboxDTO
  | TallyPayloadDropdownOptionDTO
  | TallyPayloadRankingOptionDTO
  | TallyPayloadMultiSelectOptionDTO
  | TallyPayloadPaymentDTO
  | TallyPayloadSignatureDTO
  | TallyPayloadMatrixRowDTO
  | TallyPayloadMatrixColumnDTO
  | TallyPayloadWalletConnectDTO
  | TallyPayloadConditionalLogicDTO
  | TallyPayloadCalculatedFieldsDTO
  | TallyPayloadCaptchaDTO
  | TallyPayloadRespondentCountryDTO

export interface TallyPayloadFormTitleDTO {
  html?: string
  logo?: string
  cover?: string
  coverSettings?: {
    objectPositionYPercent: number
  }
  mentions?: Array<{
    uuid: string
    field: {
      uuid: string
      type: 'InputField' | 'CalculatedField' | 'HiddenField'
      questionType: string
      blockGroupUuid: string
      title?: string
      calculatedFieldType?: 'NUMBER' | 'TEXT'
    }
    defaultValue: any
  }>
  button?: {
    label: string
  }
}

export interface TallyPayloadTextDTO {
  html: string
  isHidden?: boolean
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
}

export interface TallyPayloadLabelDTO extends TallyPayloadTextDTO {
  isFolded: boolean
}

export interface TallyPayloadTitleDTO extends TallyPayloadTextDTO {
  isFolded: boolean
}

export interface TallyPayloadHeading1DTO {
  html: string
  isHidden?: boolean
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
}

export interface TallyPayloadHeading2DTO extends TallyPayloadHeading1DTO {}

export interface TallyPayloadHeading3DTO extends TallyPayloadHeading1DTO {}

export interface TallyPayloadDividerDTO {
  isHidden?: boolean
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
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

export interface TallyPayloadImageDTO {
  url: string
  alt: string
  width: number
  height: number
  isHidden?: boolean
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
}

export interface TallyPayloadEmbedDTO {
  display?: {
    url: string
  }
  height?: string
  inputUrl?: string
  provider?: string
  title?: string
  type?: 'rich' | 'video' | 'photo' | 'link' | 'pdf' | 'gist' | 'image/*' | 'video/*' | 'audio/*'
  width?: string
  isHidden?: boolean
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
}

export interface TallyPayloadEmbedVideoDTO {
  provider: string
  url: string
  isHidden?: boolean
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
}

export interface TallyPayloadEmbedAudioDTO extends TallyPayloadEmbedVideoDTO {}

export interface TallyPayloadQuestionDTO {
  html: string
  required?: boolean
  description?: string
  isHidden?: boolean
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
}

export interface TallyPayloadMultipleChoiceDTO extends TallyPayloadQuestionDTO {
  options: Array<{
    uuid: string
    text: string
    isOther?: boolean
  }>
  allowOther?: boolean
  otherPlaceholder?: string
}

export interface TallyPayloadCheckboxesDTO extends TallyPayloadQuestionDTO {
  options: Array<{
    uuid: string
    text: string
    isOther?: boolean
  }>
  allowOther?: boolean
  otherPlaceholder?: string
  minSelected?: number
  maxSelected?: number
}

export interface TallyPayloadDropdownDTO extends TallyPayloadQuestionDTO {
  options: Array<{
    uuid: string
    text: string
  }>
  placeholder?: string
}

export interface TallyPayloadRankingDTO extends TallyPayloadQuestionDTO {
  options: Array<{
    uuid: string
    text: string
  }>
}

export interface TallyPayloadMatrixDTO extends TallyPayloadQuestionDTO {
  rows: Array<{
    uuid: string
    text: string
  }>
  columns: Array<{
    uuid: string
    text: string
  }>
  type: 'SINGLE' | 'MULTIPLE'
}

export interface TallyPayloadMultiSelectDTO extends TallyPayloadQuestionDTO {
  options: Array<{
    uuid: string
    text: string
  }>
  minSelected?: number
  maxSelected?: number
}

export interface TallyPayloadInputTextDTO extends TallyPayloadQuestionDTO {
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export interface TallyPayloadInputNumberDTO extends TallyPayloadQuestionDTO {
  placeholder?: string
  min?: number
  max?: number
  decimal?: boolean
}

export interface TallyPayloadInputEmailDTO extends TallyPayloadQuestionDTO {
  placeholder?: string
}

export interface TallyPayloadInputLinkDTO extends TallyPayloadQuestionDTO {
  placeholder?: string
}

export interface TallyPayloadInputPhoneNumberDTO extends TallyPayloadQuestionDTO {
  placeholder?: string
  defaultCountry?: string
}

export interface TallyPayloadInputDateDTO extends TallyPayloadQuestionDTO {
  format?: string
  min?: string
  max?: string
}

export interface TallyPayloadInputTimeDTO extends TallyPayloadQuestionDTO {
  format?: '12h' | '24h'
}

export interface TallyPayloadTextareaDTO extends TallyPayloadQuestionDTO {
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export interface TallyPayloadFileUploadDTO extends TallyPayloadQuestionDTO {
  maxFiles?: number
  maxFileSize?: number
  allowedFileTypes?: string[]
}

export interface TallyPayloadLinearScaleDTO extends TallyPayloadQuestionDTO {
  min: number
  max: number
  minLabel?: string
  maxLabel?: string
  step?: number
}

export interface TallyPayloadRatingDTO extends TallyPayloadQuestionDTO {
  scale: number
  icon: 'STAR' | 'HEART'
}

export interface TallyPayloadHiddenFieldsDTO {
  fields: Array<{
    uuid: string
    name: string
    value: string
  }>
}

export interface TallyPayloadMultipleChoiceOptionDTO {
  text: string
  isOther?: boolean
}

export interface TallyPayloadCheckboxDTO {
  text: string
  isOther?: boolean
}

export interface TallyPayloadDropdownOptionDTO {
  text: string
}

export interface TallyPayloadRankingOptionDTO {
  text: string
}

export interface TallyPayloadMultiSelectOptionDTO {
  text: string
}

export interface TallyPayloadPaymentDTO extends TallyPayloadQuestionDTO {
  amount: number
  currency: string
  description?: string
  provider: 'STRIPE'
}

export interface TallyPayloadSignatureDTO extends TallyPayloadQuestionDTO {
  width?: number
  height?: number
}

export interface TallyPayloadMatrixRowDTO {
  text: string
}

export interface TallyPayloadMatrixColumnDTO {
  text: string
}

export interface TallyPayloadWalletConnectDTO extends TallyPayloadQuestionDTO {
  chains?: string[]
}

export interface TallyPayloadConditionalLogicDTO {
  rules: Array<{
    field: string
    operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS' | 'GREATER_THAN' | 'LESS_THAN'
    value: any
  }>
  action: 'SHOW' | 'HIDE'
  targetFields: string[]
}

export interface TallyPayloadCalculatedFieldsDTO {
  formula: string
  format?: string
  decimals?: number
}

export interface TallyPayloadCaptchaDTO {
  type: 'RECAPTCHA' | 'HCAPTCHA'
  siteKey: string
}

export interface TallyPayloadRespondentCountryDTO {
  defaultValue?: string
}