import { TallyBlockTypes } from '@/lib'
import { TallyFormBlockModel } from '@/models'
import { TallyFormBlockDTO, TallyPayloadDTO } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export function initNewTallyBlock(blockType: TallyBlockTypes): TallyFormBlockDTO {
  return new TallyFormBlockModel({
    groupType: blockType,
    groupUuid: uuidv4(),
    type: blockType,
    uuid: uuidv4(),
    payload: {} as Partial<TallyPayloadDTO>,
  })
}
