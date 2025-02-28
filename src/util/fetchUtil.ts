import { HttpResponse, isTallyError, TallyError } from '@/lib'

export async function fetchWrapper<T>(
  request: Promise<HttpResponse<any>>,
): Promise<{ data: T | null; error: TallyError | null }> {
  try {
    const { data, error: httpError } = await request
    const responseData = data ? (data as T) : null
    return { data: responseData, error: httpError }
  } catch (error) {
    if (isTallyError(error)) {
      return { data: null, error }
    }
    throw error
  }
}
