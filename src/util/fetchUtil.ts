import { HttpResponse, isTallyError } from '../lib'

export async function fetchWrapper<T>(
  request: Promise<HttpResponse<any>>,
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const { data, error: httpError } = await request
    console.log('fetchWrapper', httpError)
    const responseData = data ? (data as T) : null
    return { data: responseData, error: httpError }
  } catch (error) {
    if (isTallyError(error)) {
      return { data: null, error }
    }
    throw error
  }
}
