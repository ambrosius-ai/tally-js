import { TallyBlockTypes } from '../lib'

export type TallyPayloadDTO =
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
  | TallyPayloadDefaultAnswerDTO
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
  | TallyPayloadInputTextAreaDTO
  | TallyPayloadFileUploadDTO
  | TallyPayloadLinearScaleDTO
  | TallyPayloadRatingDTO
  | TallyPayloadHiddenFieldsDTO
  | TallyPayloadDropdownOptionDTO
  | TallyPayloadRankingOptionDTO
  | TallyPayloadMultipleChoiceOptionDTO
  | TallyPayloadMultiSelectOptionDTO
  | TallyPayloadCheckboxDTO
  | TallyPayloadPaymentDTO
  | TallyPayloadSignatureDTO
  | TallyPayloadMatrixRowDTO
  | TallyPayloadMatrixColumnDTO
  | TallyPayloadWalletConnectDTO
  | TallyPayloadConditionalLogicDTO
  | TallyPayloadCalculdatedFieldsDTO
  | TallyPayloadCaptchaDTO
  | TallyPayloadRespondentCountryDTO
  | object

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
  html?: string
}

export interface TallyPayloadLabelDTO extends TallyPayloadTextDTO {
  isFolded?: boolean
}

/** same payload for H1, H2, H3 */
export interface TallyPayloadHeadingDTO extends TallyPayloadLayoutDTO {
  html?: string
}

export interface TallyPayloadTitleDTO extends TallyPayloadTextDTO {
  isFolded?: boolean
}

export interface TallyPayloadPageBreakDTO {
  index?: number
  isFirst?: boolean
  isLast?: boolean
  isQualifiedForThankYouPage?: boolean
  isThankYouPage?: boolean
}

export interface TallyPayloadThankYouPageDTO {
  isHidden?: boolean
  isThankYouPage?: boolean
}

export interface TallyPayloadImageDTO extends TallyPayloadLayoutDTO {
  alt?: string
  height?: number
  url?: string
  width?: number
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
  provider?: string
  url?: string
}

export type TallyPayloadEmbedVideoDTO = TallyPayloadEmbedAudioDTO

export interface TallyPayloadDefaultAnswerDTO {
  blockGroupUuid?: string
  questionType?: TallyBlockTypes
  type?: 'InputField' | 'CalculatedField' | 'HiddenField'
  uuid?: string
  calculatedFieldType?: 'NUMBER' | 'TEXT'
  title?: string
}
export interface TallyPayloadQuestionDTO {
  isHidden?: boolean
  isRequired?: boolean
}

export interface TallyPayloadMultipleChoiceDTO extends TallyPayloadQuestionDTO {
  allowMultiple?: boolean
  badgeType?: 'OFF' | 'NUMBERS' | 'LETTERS'
  color?: string
  colorCodeOptions?: boolean
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  defaultAnswer?: TallyPayloadDefaultAnswerDTO
  hasBadge?: boolean
  hasDefaultAnswer?: boolean
  hasMaxChoices?: boolean
  hasMinChoices?: boolean
  hasOtherOption?: boolean
  image?: string
  isOtherOption?: boolean
  lockInPlace?: string[]
  maxChoices?: number
  minChoices?: number
  name?: string
  randomize?: boolean
}

export interface TallyPayloadCheckboxesDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  defaultAnswer?: TallyPayloadDefaultAnswerDTO
  hasDefaultAnswer?: boolean
  name?: string
}

export interface TallyPayloadDropdownDTO extends TallyPayloadCheckboxesDTO {
  placeholder?: string
}

export interface TallyPayloadRankingDTO extends TallyPayloadCheckboxesDTO {}

export interface TallyPayloadMatrixDTO extends TallyPayloadCheckboxesDTO {}

export interface TallyPayloadMultiSelectDTO extends TallyPayloadCheckboxesDTO {
  hasMaxChoices?: boolean
  hasMinChoices?: boolean
  maxChoices?: number
  minChoices?: number
}

export interface TallyPayloadInputTextDTO extends TallyPayloadCheckboxesDTO {
  hasMaxCaracters?: boolean
  hasMinCaracters?: boolean
  maxCharacters?: number
  minCharacters?: number
  placeholder?: string
}

export interface TallyPayloadInputNumberDTO extends TallyPayloadCheckboxesDTO {
  currency?: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CNY' | 'INR'
  decimalSeparator?: 'COMMA' | 'DOT'
  defaultAnswer?: TallyPayloadDefaultAnswerDTO
  hasDefaultAnswer?: boolean
  hasMaxValue?: boolean
  hasMinValue?: boolean
  maxValue?: number
  minValue?: number
  numberFormat?: 'NUMBER' | 'CURRENCY' | 'PERCENTAGE'
  placeholder?: string
  thousandsSeparator?: 'COMMA' | 'DOT' | 'SPACE' | 'NONE'
}
export interface TallyPayloadInputEmailDTO extends TallyPayloadCheckboxesDTO {
  placeholder?: string
}

export interface TallyPayloadInputLinkDTO extends TallyPayloadInputEmailDTO {}
export interface TallyPayloadInputPhoneNumberDTO extends TallyPayloadInputEmailDTO {}

export interface TallyPayloadInputDateDTO extends TallyPayloadInputEmailDTO {
  disableDays?:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
    | 'PAST'
    | 'FUTURE'
    | 'TODAY'
}

export interface TallyPayloadInputTimeDTO extends TallyPayloadInputEmailDTO {}

export interface TallyPayloadInputTextAreaDTO extends TallyPayloadInputTextDTO {}

export interface TallyPayloadFileUploadDTO extends TallyPayloadQuestionDTO {
  allowedFiles?: object
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  hasMaxFiles?: boolean
  hasMaxFileSize?: boolean
  maxFiles?: number
  maxFileSize?: number
  name?: string
}

export interface TallyPayloadLinearScaleDTO extends TallyPayloadCheckboxesDTO {
  maxLabel?: string
  maxValue?: number
  minLabel?: string
  minValue?: number
}

export interface TallyPayloadRatingDTO extends TallyPayloadCheckboxesDTO {
  maxValue?: number
}

export interface TallyPayloadHiddenFieldsDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  fields?: object[]
  isHidden?: boolean
}

export interface TallyPayloadDropdownOptionDTO extends TallyPayloadCheckboxesDTO {
  index?: number
  isFirst?: boolean
  isLast?: boolean
}

export interface TallyPayloadRankingOptionDTO extends TallyPayloadDropdownOptionDTO {}

export interface TallyPayloadMultipleChoiceOptionDTO extends TallyPayloadDropdownOptionDTO {
  badgeType?: 'OFF' | 'NUMBERS' | 'LETTERS'
  color?: string
  colorcodeOptions?: boolean
  hasBadge?: boolean
  hasOtherOption?: boolean
  image?: string
  isOtherOption?: boolean
}

export interface TallyPayloadMultiSelectOptionDTO extends TallyPayloadMultipleChoiceOptionDTO {}

export interface TallyPayloadCheckboxDTO extends TallyPayloadMultipleChoiceOptionDTO {}

export interface TallyPayloadPaymentDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
  isRequired?: boolean
  name?: string
  amount?: number
  currency?: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CNY' | 'INR'
}

export interface TallyPayloadSignatureDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  name?: string
}

export interface TallyPayloadMatrixRowDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  name?: string
  isFirst?: boolean
  isLast?: boolean
  index?: number
}

export interface TallyPayloadMatrixColumnDTO extends TallyPayloadMatrixRowDTO {}

export interface TallyPayloadWalletConnectDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  name?: string
}
export interface TallyPayloadConditionalLogicDTO {
  actions?: { blockUuids: string[]; type: 'SHOW' | 'HIDE' | 'SKIP_TO'; uuid: string }
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  conditionals?: {
    field: {
      blockGroupUuid: string
      questionType: TallyBlockTypes
      type: 'InputField' | 'CalculatedField' | 'HiddenField'
      uuid: string
      calculatedFieldType: ' NUMBER ' | 'TEXT'
      title: string
    }
    operator: string
    uuid: string
    value: string
  }
  isHidden?: boolean
}

export type TallyField = {
  name?: string
  type?: 'NUMBER' | 'TEXT'
  uuid?: string
  value?: string
}

export interface TallyPayloadCalculdatedFieldsDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  fields?: TallyField[]
  isHidden?: boolean
}

export interface TallyPayloadCaptchaDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
  isRequired?: boolean
}

export interface TallyPayloadRespondentCountryDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
  isRequired?: boolean
  name?: string
}
