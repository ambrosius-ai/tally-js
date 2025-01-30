import { TallyFormStatus } from '../lib/constants'
import { TallyFormBlockDTO, TallyFormSettingsDTO } from '../types/form.dto.types'

export class TallyFormModel {
  // id: string // response
  blocks: TallyFormBlockDTO[]
  status: TallyFormStatus
  settings?: TallyFormSettingsDTO
  workspaceId?: string
  templateId?: string
  // createdAt: string // response
  ///...

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
