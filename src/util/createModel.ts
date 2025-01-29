type Constructor<T> = new (data: T) => T

export function createModel<T extends object>(): Constructor<T> {
  return class {
    constructor(data: T) {
      Object.assign(this, data)
    }
  } as Constructor<T>
}
