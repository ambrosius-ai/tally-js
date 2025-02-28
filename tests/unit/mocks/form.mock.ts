import { TallyFormSimpleResponseDTO, TallyFormUpdateDTO } from '@/types'
import { TallyFormStatus, TallyBlockTypes } from '@/lib'
import { TallyFormModel } from '@/models'
import { initNewTallyBlock } from '@/util'

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

// Mock for update operation
export const mockValidUpdateRequest: TallyFormUpdateDTO = {
  id: '123',
  name: 'Updated Form',
  blocks: [
    {
      type: TallyBlockTypes.FORM_TITLE,
      groupType: TallyBlockTypes.FORM_TITLE,
      uuid: '1',
      groupUuid: '1',
      payload: {
        html: 'Updated Form',
        button: {
          label: 'Submit',
        },
      },
    },
  ],
  status: TallyFormStatus.PUBLISHED,
}

export const mockUpdateResponse = {
  data: {
    id: '123',
    name: 'Updated Form',
    createdAt: '2025-02-13T17:30:00Z',
    updatedAt: '2025-02-13T17:31:00Z',
    isClosed: false,
    numberOfSubmissions: 0,
    status: TallyFormStatus.PUBLISHED,
    workspaceId: 'ws-123',
  } as TallyFormSimpleResponseDTO,
  error: null,
}

// Mock for get operation
export const mockGetResponse = {
  data: {
    id: '123',
    name: 'Test Form',
    createdAt: '2025-02-13T17:30:00Z',
    updatedAt: '2025-02-13T17:30:00Z',
    isClosed: false,
    numberOfSubmissions: 0,
    status: TallyFormStatus.PUBLISHED,
    workspaceId: 'ws-123',
    blocks: [
      {
        type: TallyBlockTypes.FORM_TITLE,
        groupType: TallyBlockTypes.FORM_TITLE,
        uuid: '1',
        groupUuid: '1',
        payload: {
          html: 'Test Form',
          button: {
            label: 'Submit',
          },
        },
      },
    ],
  },
  error: null,
}

// Mock for list operation
export const mockListResponse = {
  data: {
    items: [
      {
        id: '123',
        name: 'Test Form',
        createdAt: '2025-02-13T17:30:00Z',
        updatedAt: '2025-02-13T17:30:00Z',
        isClosed: false,
        numberOfSubmissions: 0,
        status: TallyFormStatus.PUBLISHED,
        workspaceId: 'ws-123',
      },
    ],
    total: 1,
  },
  error: null,
}

// Mock for empty list response
export const mockEmptyListResponse = {
  data: {
    items: [],
    total: 0,
  },
  error: null,
}

// Mock for delete operation
export const mockDeleteResponse = {
  data: null,
  error: null,
}
