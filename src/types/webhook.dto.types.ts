/**
 * Type definitions for webhook-related data
 * 
 * This module contains type definitions for webhooks, including
 * webhook configuration, events, and HTTP headers.
 * 
 * @category Wehoook Types
 * @remarks
 * - Defines the structure of webhook configurations and their properties
 * - Includes types for webhook events and HTTP headers
 * - Supports webhook security through signing secrets
 * - Provides DTOs for creating, updating, and receiving webhook data
 */
export interface HttpHeader {
  name: string
  value: string
}

/**
 * @category Webhooks Types
 */
export enum TallyWebhookEventType {
  FORM_RESPONSE = 'FORM_RESPONSE',
}

/**
 * @category Webhooks Types
 */
export interface TallyWebhookCreateDTO {
  formId: string
  url: string
  eventTypes: TallyWebhookEventType[]
  signingSecret?: string | null
  httpHeaders?: HttpHeader[] | null
  externalSubscriber?: string
}

/**
 * @category Webhooks Types
 */
export interface TallyWebhookResponseDTO {
  id: string
  url: string
  eventTypes: 'FORM_RESPONSE'[]
  isEnabled: boolean
  createdAt: string
}

/**
 * @category Webhooks Types
 */
export interface TallyWebhookUpdateDTO {
  id: string
  formId: string
  url: string
  eventTypes: 'FORM_RESPONSE'[]
  isEnabled: boolean
  signingSecret?: string | null
  httpHeaders?: HttpHeader[] | null
}
