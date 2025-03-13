/**
 * Inspired by supabase.js client implementations, i.e. storage-js
 * @category Errors
 */
export class TallyError extends Error {
  protected __isTallyError = true

  constructor(message: string) {
    super(message)
    this.name = 'TallyError'
  }
}


/**
 * @category Errors
 */
export function isTallyError(error: unknown): error is TallyError {
  return typeof error === 'object' && error !== null && '__isTallyError' in error
}

/**
 * @category Errors
 */
export class TallyInvalidClientConfigError extends TallyError {}

/**
 * @category Errors
 */
export class TallyApiError extends TallyError {
  constructor(message: string, status: number) {
    super(message)
    this.name = 'TallyApiError | ' + status
  }
}

/**
 * @category Errors
 */
export class TallyInvalidRequestError extends TallyError {}

/**
 * @category Errors
 */
export class TallyUnknownError extends TallyError {
  originError: unknown
  constructor(message: string, originalError: unknown) {
    super(message)
    this.name = 'TallyUnknowError'
    this.originError = originalError
  }
}
