import { EventEntity } from '../utils/types'

/**
 * Filter events listing based on user selections
 */
export default function useEventsFilter(
  posts: EventEntity[] | undefined,
  taxonomyFilter: number[],
  from: Date,
  to: Date
) {
  if (!posts) return null

  return posts.filter(post => {
    // Filter by Term IDs
    const genresMatch =
      taxonomyFilter.length === 0 ||
      post.genres.filter(term => taxonomyFilter.includes(term.tid)).length

    const seasonsMatch =
      taxonomyFilter.length === 0 ||
      post.seasons.filter(term => taxonomyFilter.includes(term.tid)).length

    // Filter by date range
    const firstPerformanceInRange =
      !to ||
      post.performances.find(performance => {
        const performanceDate = new Date(performance.datetime).setHours(
          0,
          0,
          0,
          0
        )
        const isInDateRange =
          performanceDate >= from.setHours(0, 0, 0, 0) &&
          performanceDate <= to.setHours(0, 0, 0, 0)
        return isInDateRange
      })

    return (
      (genresMatch || seasonsMatch) && firstPerformanceInRange !== undefined
    )
  })
}
