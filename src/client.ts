import { TallyForms } from './services/formService'

export class TallyClient {
  apiKey: string
  forms: TallyForms

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.forms = new TallyForms(this.apiKey)
  }
}
