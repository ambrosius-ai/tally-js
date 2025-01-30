import { createModel } from '../util/createModel'
import { TallyFormBlockDTO } from '../types/'
import * as payload from '../types/payload.dto.types'

export * from './FormModel'

export const TallyFormBlockModel = createModel<TallyFormBlockDTO>()

export const TallyPayloadDividerModel = createModel<payload.TallyPayloadDividerDTO>()
export const TallyPayloadTextModel = createModel<payload.TallyPayloadTextDTO>()
export const TallyPayloadFormTitleModel = createModel<payload.TallyPayloadFormTitleDTO>()
export const TallyPayloadLabelModel = createModel<payload.TallyPayloadLabelDTO>()
export const TallyPayloadHeadingModel = createModel<payload.TallyPayloadHeadingDTO>()
export const TallyPayloadTitleModel = createModel<payload.TallyPayloadTitleDTO>()
export const TallyPayloadPageBreakModel = createModel<payload.TallyPayloadPageBreakDTO>()
export const TallyPayloadThankYouPageModel = createModel<payload.TallyPayloadThankYouPageDTO>()
export const TallyPayloadImageModel = createModel<payload.TallyPayloadImageDTO>()
export const TallyPayloadEmbedModel = createModel<payload.TallyPayloadEmbedDTO>()
export const TallyPayloadEmbedAudioModel = createModel<payload.TallyPayloadEmbedAudioDTO>()
export const TallyPayloadEmbedVideoModel = createModel<payload.TallyPayloadEmbedVideoDTO>()
