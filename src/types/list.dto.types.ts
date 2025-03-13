/**
 * Type definitions for paginated list responses
 * 
 * This module contains type definitions for paginated list responses from the Tally API.
 * These types are used to handle paginated data across different endpoints.
 * 
 * @category Types
 * @remarks
 * - TallyListDTO is a generic type that can be used with any item type
 * - Includes metadata about pagination (page, limit, total, hasMore)
 * - Used by various endpoints that return lists of items
 */
export interface TallyListDTO<T> {
  items: T[]
  page: number
  limit: number
  total: number
  hasMore: boolean
}
