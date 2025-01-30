import { createModel } from '../util/createModel'
import { TallyFormBlockDTO, ITallyTextOrHeadingPayload } from '../types/dto.types'

export * from './FormModel'

export const TallyFormBlockModel = createModel<TallyFormBlockDTO>()
export const TextOrHeadingPayloadModel = createModel<ITallyTextOrHeadingPayload>()
