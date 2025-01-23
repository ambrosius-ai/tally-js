export interface TallyRequest {
  httpMethod: string
  url: string
  apiKey: string
  contentType: string
  data?: any
  createTallyRequest(overrides: Partial<TallyRequest>): TallyRequest
}

// const createTallyRequest = (overrides: Partial<TallyRequest> = {}): TallyRequest => {
//   return {
//     url: 'defaultUrl',
//     apiKey: 'defaultApiKey',
//     contentType: 'defaultContentType',
//     ...overrides,
//   }
// }

// // Usage
// const request = createTallyRequest({ url: 'customUrl' })
// console.log(request)
// // Output: { url: 'customUrl', apiKey: 'defaultApiKey', contentType: 'defaultContentType' }
