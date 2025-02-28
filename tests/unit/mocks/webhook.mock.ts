import {
  TallyWebhookCreateDTO,
  TallyWebhookResponseDTO,
  TallyWebhookUpdateDTO,
  TallyWebhookEventType,
} from '@/types/webhook.dto.types'

export const mockWebhookCreateRequest: TallyWebhookCreateDTO = {
  url: 'https://example.com/webhook',
  formId: '123',
  eventTypes: [TallyWebhookEventType.FORM_RESPONSE],
}

export const mockWebhookUpdateRequest: TallyWebhookUpdateDTO = {
  id: '123',
  url: 'https://example.com/webhook-updated',
  formId: '456',
  eventTypes: [TallyWebhookEventType.FORM_RESPONSE],
  isEnabled: true,
}

export const mockWebhookResponse = {
  data: {
    id: '123',
    url: 'https://example.com/webhook',
    eventTypes: [TallyWebhookEventType.FORM_RESPONSE],
    isEnabled: true,
    createdAt: '2025-02-13T17:30:00Z',
  } as TallyWebhookResponseDTO,
  error: null,
}

export const mockWebhookUpdateResponse = {
  data: {
    id: '123',
    formId: '456',
    url: 'https://example.com/webhook-updated',
    eventTypes: [TallyWebhookEventType.FORM_RESPONSE],
    isEnabled: true,
    createdAt: '2025-02-13T17:30:00Z',
  } as TallyWebhookResponseDTO,
  error: null,
}
