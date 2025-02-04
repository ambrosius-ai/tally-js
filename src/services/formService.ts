import { TallyForm } from '../types'
import { TallyError } from '../lib/errors'

export class TallyForms {
  #apiKey: string
  constructor(apiKey: string) {
    this.#apiKey = apiKey
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

    const data = response.ok ? await response.json() : undefined
    const error = !response.ok ? (new Error(response.statusText) as TallyError) : undefined

    return {
      data: data as unknown as TallyForm,
      error: error,
    }
  }

  async get(formId: string): Promise<{ data?: Partial<TallyForm>; error?: TallyError }> {
    const response = await fetch(`https://api.tally.so/forms/${formId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#apiKey}`,
      },
    })
    const data = response.ok ? await response.json() : undefined
    const error = !response.ok ? (new Error(response.statusText) as TallyError) : undefined

    return {
      data: data as unknown as TallyForm,
      error: error,
    }
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
