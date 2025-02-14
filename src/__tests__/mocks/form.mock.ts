import { TallyFormSimpleResponseDTO } from '../../types'
import { TallyFormStatus, TallyBlockTypes } from '../../lib'
import { TallyFormModel } from '../../models'
import { initNewTallyBlock } from '../../util'

export const mockSimpleResponse = {
  data: {
    id: '123',
    name: 'Test Form',
    createdAt: '2025-02-13T17:30:00Z',
    updatedAt: '2025-02-13T17:30:00Z',
    isClosed: false,
    numberOfSubmissions: 0,
    status: TallyFormStatus.DRAFT,
    workspaceId: 'ws-123',
  } as TallyFormSimpleResponseDTO,
  error: null,
}

export const mockValidFormRequest = new TallyFormModel(
  [], // no blocks - starting from scratch
  TallyFormStatus.DRAFT,
  {}, // default settings
  'ws-id-test',
)

const titleBlock = initNewTallyBlock(TallyBlockTypes.TITLE)
titleBlock.payload = {
  title: 'Title: Test Successfull From Creation',
  html: 'Title: Test Successfull From Creation',
}
mockValidFormRequest.addBlock(titleBlock)
