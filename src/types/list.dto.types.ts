export interface TallyListDTO<T> {
  items: T[]
  page: number
  limit: number
  total: number
  hasMore: boolean
}
