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

export class TallyApiError extends TallyError {
  constructor(message: string, status: number) {
    super(message)
    this.name = 'TallyApiError | ' + status
  }
}

export class TallyUnknowError extends TallyError {
  originError: unknown
  constructor(message: string, originalError: unknown) {
    super(message)
    this.name = 'TallyUnknowError'
    this.originError = originalError
  }
}
