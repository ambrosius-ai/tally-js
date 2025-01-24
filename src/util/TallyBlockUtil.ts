import { TallyBlock } from '../lib/TallyBlock'
import { v4 as uuidv4 } from 'uuid'

export function initNewTallyBlock(blockType: string): TallyBlock {
  return new TallyBlock(blockType, uuidv4(), blockType, uuidv4())
}
