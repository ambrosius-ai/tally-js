import { TallyBlockTypes } from '@/lib'

/**
 * Type definitions for Tally form block payloads
 * 
 * This module contains all type definitions for the payloads of different form blocks.
 * Each block type has its own specific payload structure that defines its properties and behavior.
 * 
 * @category Types
 * @remarks
 * - The TallyPayloadDTO type is a union of all possible block payload types
 * - Each payload type extends from base interfaces like TallyPayloadLayoutDTO and TallyPayloadQuestionDTO
 * - Payload types define the structure and validation rules for different form elements
 * - The types support various form elements including text, questions, media, and special fields
 */
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

/**
 * 
 * @category Payload Types
*/
export interface TallyPayloadLayoutDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
}

/**
 * 
 * @category Payload Types
*/
export interface TallyPayloadDividerDTO extends TallyPayloadLayoutDTO {}

/**
 * 
 * @category Payload Types
*/
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

/**
 * 
 * @category Payload Types
*/
export interface TallyPayloadTextDTO extends TallyPayloadLayoutDTO {
  html?: string
}

/**
 * 
 * @category Payload Types
*/
export interface TallyPayloadLabelDTO extends TallyPayloadTextDTO {
  isFolded?: boolean
}



/**
 * same payload for H1, H2, H3 
 * @category Payload Types
*/
export interface TallyPayloadHeadingDTO extends TallyPayloadLayoutDTO {
  html?: string
}

/**
 * same payload for H1, H2, H3 
 * @category Payload Types
*/
export interface TallyPayloadTitleDTO extends TallyPayloadTextDTO {
  isFolded?: boolean
}

/**
 * @category Payload Types
*/
export interface TallyPayloadPageBreakDTO {
  index?: number
  isFirst?: boolean
  isLast?: boolean
  isQualifiedForThankYouPage?: boolean
  isThankYouPage?: boolean
}

/**
 * @category Payload Types
*/
export interface TallyPayloadThankYouPageDTO {
  isHidden?: boolean
  isThankYouPage?: boolean
}

/**
 * @category Payload Types
*/
export interface TallyPayloadImageDTO extends TallyPayloadLayoutDTO {
  alt?: string
  height?: number
  url?: string
  width?: number
}

/**
 * @category Payload Types
*/
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

/**
 * @category Payload Types
*/
export interface TallyPayloadEmbedAudioDTO extends TallyPayloadLayoutDTO {
  provider?: string
  url?: string
}

/**
 * @category Payload Types
*/
export type TallyPayloadEmbedVideoDTO = TallyPayloadEmbedAudioDTO

/**
 * @category Payload Types
*/
export interface TallyPayloadDefaultAnswerDTO {
  blockGroupUuid?: string
  questionType?: TallyBlockTypes
  type?: 'InputField' | 'CalculatedField' | 'HiddenField'
  uuid?: string
  calculatedFieldType?: 'NUMBER' | 'TEXT'
  title?: string
}

/**
 * @category Payload Types
*/
export interface TallyPayloadQuestionDTO {
  isHidden?: boolean
  isRequired?: boolean
}

/**
 * @category Payload Types
*/
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

/**
 * @category Payload Types
*/
export interface TallyPayloadCheckboxesDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  defaultAnswer?: TallyPayloadDefaultAnswerDTO
  hasDefaultAnswer?: boolean
  name?: string
}

/**
 * @category Payload Types
*/
export interface TallyPayloadDropdownDTO extends TallyPayloadCheckboxesDTO {
  placeholder?: string
}

/**
 * @category Payload Types
*/
export interface TallyPayloadRankingDTO extends TallyPayloadCheckboxesDTO {}

/**
 * @category Payload Types
*/
export interface TallyPayloadMatrixDTO extends TallyPayloadCheckboxesDTO {}

/**
 * @category Payload Types
*/
export interface TallyPayloadMultiSelectDTO extends TallyPayloadCheckboxesDTO {
  hasMaxChoices?: boolean
  hasMinChoices?: boolean
  maxChoices?: number
  minChoices?: number
}

/**
 * @category Payload Types
*/
export interface TallyPayloadInputTextDTO extends TallyPayloadCheckboxesDTO {
  hasMaxCaracters?: boolean
  hasMinCaracters?: boolean
  maxCharacters?: number
  minCharacters?: number
  placeholder?: string
}

/**
 * @category Payload Types
*/
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

/**
 * @category Payload Types
*/
export interface TallyPayloadInputEmailDTO extends TallyPayloadCheckboxesDTO {
  placeholder?: string
}


/**
 * @category Payload Types
*/
export interface TallyPayloadInputLinkDTO extends TallyPayloadInputEmailDTO {}
/**
 * @category Payload Types
*/
export interface TallyPayloadInputPhoneNumberDTO extends TallyPayloadInputEmailDTO {}

/**
 * @category Payload Types
*/
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

/**
 * @category Payload Types
*/
export interface TallyPayloadInputTimeDTO extends TallyPayloadInputEmailDTO {}

/**
 * @category Payload Types
*/
export interface TallyPayloadInputTextAreaDTO extends TallyPayloadInputTextDTO {}

/**
 * @category Payload Types
*/
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

/**
 * @category Payload Types
*/
export interface TallyPayloadLinearScaleDTO extends TallyPayloadCheckboxesDTO {
  maxLabel?: string
  maxValue?: number
  minLabel?: string
  minValue?: number
}

/**
 * @category Payload Types
*/
export interface TallyPayloadRatingDTO extends TallyPayloadCheckboxesDTO {
  maxValue?: number
}

/**
 * @category Payload Types
*/
export interface TallyPayloadHiddenFieldsDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  fields?: object[]
  isHidden?: boolean
}

/**
 * @category Payload Types
*/
export interface TallyPayloadDropdownOptionDTO extends TallyPayloadCheckboxesDTO {
  index?: number
  isFirst?: boolean
  isLast?: boolean
}

/**
 * @category Payload Types
*/
export interface TallyPayloadRankingOptionDTO extends TallyPayloadDropdownOptionDTO {}

/**
 * @category Payload Types
*/
export interface TallyPayloadMultipleChoiceOptionDTO extends TallyPayloadDropdownOptionDTO {
  badgeType?: 'OFF' | 'NUMBERS' | 'LETTERS'
  color?: string
  colorcodeOptions?: boolean
  hasBadge?: boolean
  hasOtherOption?: boolean
  image?: string
  isOtherOption?: boolean
}

/**
 * @category Payload Types
*/
export interface TallyPayloadMultiSelectOptionDTO extends TallyPayloadMultipleChoiceOptionDTO {}

/**
 * @category Payload Types
*/
export interface TallyPayloadCheckboxDTO extends TallyPayloadMultipleChoiceOptionDTO {}

/**
 * @category Payload Types
*/
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

/**
 * @category Payload Types
*/
export interface TallyPayloadSignatureDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  name?: string
}

/**
 * @category Payload Types
*/
export interface TallyPayloadMatrixRowDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  name?: string
  isFirst?: boolean
  isLast?: boolean
  index?: number
}

/**
 * @category Payload Types
*/
export interface TallyPayloadMatrixColumnDTO extends TallyPayloadMatrixRowDTO {}

/**
 * @category Payload Types
*/
export interface TallyPayloadWalletConnectDTO extends TallyPayloadQuestionDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  name?: string

}

/**
 * @category Payload Types
*/
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

/**
 * @category Payload Types
*/
export type TallyField = {
  name?: string
  type?: 'NUMBER' | 'TEXT'
  uuid?: string
  value?: string
}

/**
 * @category Payload Types
*/
export interface TallyPayloadCalculdatedFieldsDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  fields?: TallyField[]
  isHidden?: boolean
}

/**
 * @category Payload Types
*/
export interface TallyPayloadCaptchaDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
  isRequired?: boolean
}

/**
 * @category Payload Types
*/
export interface TallyPayloadRespondentCountryDTO {
  columnListUuid?: string
  columnRatio?: number
  columnUuid?: string
  isHidden?: boolean
  isRequired?: boolean
  name?: string
}
