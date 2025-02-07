/**
 * Inspired by supabase.js client implementations, i.e. storage-js
 */
export class TallyError extends Error {
  protected __isTallyError = true

  constructor(message: string) {
    super(message)
    this.name = 'TallyError'
  }
}

export function isTallyError(error: unknown): error is TallyError {
  return typeof error === 'object' && error !== null && '__isTallyError' in error
}

export class TallyInvalidClientConfigError extends TallyError {}
