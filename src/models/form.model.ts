import { createModel } from '../util/createModel'
import { TallyFormStatus } from '../lib/constants'
import { TallyFormBlockDTO, TallyFormSettingsDTO } from '../types/form.dto.types'

export class TallyFormModel {
  blocks: TallyFormBlockDTO[]
  status: TallyFormStatus
  settings?: TallyFormSettingsDTO
  workspaceId?: string
  templateId?: string

  constructor(
    blocks: TallyFormBlockDTO[],
    status: TallyFormStatus,
    settings?: TallyFormSettingsDTO,
    workspaceId?: string,
    templateId?: string,
  ) {
    this.blocks = blocks
    this.workspaceId = workspaceId
    this.templateId = templateId
    this.status = status
    this.settings = settings
  }

  addBlock(block: TallyFormBlockDTO): TallyFormModel {
    this.blocks.push(block)
    return this
  }
}

export const TallyFormBlockModel = createModel<TallyFormBlockDTO>()
