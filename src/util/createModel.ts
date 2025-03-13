type Constructor<T> = new (data: T) => T

/**
 * Serves as utility function to provide models that can be intanstiated
 * TODO: Is it possible to generate match playload type for FormBlocks?
 * @returns a model defintion for any given interface
 * @category Utils
 */
export function createModel<T extends object>(): Constructor<T> {
  return class {
    constructor(data: T) {
      Object.assign(this, data)
    }
  } as Constructor<T>
}
