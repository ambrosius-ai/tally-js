//TODO:  handle file path with alias
import { TallyFormStatus } from './constants'
import { TallyFormSettings } from './types'
import { TallyBlock } from './TallyBlock'

// Do we differentiate between a type that is the payload for creating a form
// and a type that represents the form a.k.a the response
// gues it makes sense to differntiate between the two

// will we use interfaces or namespaces and how

export class TallyForm {
  // id: string // response
  blocks: TallyBlock[]
  status: TallyFormStatus
  settings?: TallyFormSettings
  workspaceId?: string
  templateId?: string
  // createdAt: string // response
  ///...

  constructor(
    blocks: TallyBlock[],
    status: TallyFormStatus,
    settings?: TallyFormSettings,
    workspaceId?: string,
    templateId?: string,
  ) {
    this.blocks = blocks
    this.workspaceId = workspaceId
    this.templateId = templateId
    this.status = status
    this.settings = settings
  }

  addBlock(block: TallyBlock): TallyForm {
    this.blocks.push(block)
    return this
  }
}
