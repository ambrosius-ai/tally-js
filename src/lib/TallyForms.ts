import { TallyBlock } from './TallyBlock'
import { TallyForm } from './TallyForm'
import { TallyFormSettings } from './TallyFormSettings'
import { TallyFormStatus } from './TallyFormStatus'
import { TallyError } from './Errors'

export class TallyForms {
  #apiKey: string
  constructor(apiKey: string) {
    this.#apiKey = apiKey
  }

  init(
    blocks: TallyBlock[],
    status: TallyFormStatus,
    settings: TallyFormSettings,
    workspaceId?: string,
    templateId?: string,
  ): TallyForm {
    return new TallyForm(blocks, status, settings, workspaceId, templateId)
  }

  async create(form: TallyForm): Promise<{ data?: Partial<TallyForm>; error?: TallyError }> {
    const response = await fetch('https://api.tally.so/forms', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#apiKey}`,
      },
    })

    console.log(response)

    return new Promise((resolve) => {
      resolve({
        data: response.ok ? (response.json() as unknown as TallyForm) : undefined,
        error: !response.ok ? (new Error(response.statusText) as TallyError) : undefined,
      })
    })
  }

  async update(form: TallyForm): Promise<TallyForm> {
    return new Promise((resolve) => {
      resolve(form)
    })
  }

  async delete(form: TallyForm): Promise<TallyForm> {
    return new Promise((resolve) => {
      resolve(form)
    })
  }
}
