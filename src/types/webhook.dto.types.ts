export interface HttpHeader {
  name: string
  value: string
}

export enum TallyWebhookEventType {
  FORM_RESPONSE = 'FORM_RESPONSE',
}

export interface TallyWebhookCreateDTO {
  formId: string
  url: string
  eventTypes: TallyWebhookEventType[]
  signingSecret?: string | null
  httpHeaders?: HttpHeader[] | null
  externalSubscriber?: string
}

export interface TallyWebhookResponseDTO {
  id: string
  url: string
  eventTypes: 'FORM_RESPONSE'[]
  isEnabled: boolean
  createdAt: string
}

export interface TallyWebhookUpdateDTO {
  formId: string
  url: string
  eventTypes: 'FORM_RESPONSE'[]
  isEnabled: boolean
  signingSecret?: string | null
  httpHeaders?: HttpHeader[] | null
}
