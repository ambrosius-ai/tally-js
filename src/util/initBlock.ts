import { TallyBlockTypes } from '../lib'
import { TallyFormBlockModel, TallyPayloadTextModel } from '../models'
import {
  TallyFormBlockDTO,
  TallyPayloadDTO,
  // TallyPayloadFormTitleDTO,
  TallyPayloadTextDTO,
} from '../types'
import { v4 as uuidv4 } from 'uuid'
import { createModel } from './createModel'

export function initNewTallyBlock(blockType: TallyBlockTypes): TallyFormBlockDTO {
  return new TallyFormBlockModel({
    groupType: blockType,
    groupUuid: uuidv4(),
    type: blockType,
    uuid: uuidv4(),
    payload: initPayload(blockType),
  })
}

/**
 * Initializes a new payload for a given block type
 * @param blockType the type of block to initialize
 * @returns an instance of a payload for the given block type
 */
function initPayload(blockType: TallyBlockTypes): Partial<TallyPayloadDTO> {
  switch (blockType) {
    case TallyBlockTypes.FORM_TITLE:
      return new TallyPayloadTextModel({}) as TallyPayloadTextDTO
    case TallyBlockTypes.TEXT:
      return new (createModel<TallyPayloadTextDTO>())({}) as TallyPayloadTextDTO
    default:
      return {}
  }
}
