import axios from 'axios'
import {
  AppData,
  DataAction,
  StateAction,
  AppState,
  EventEntity,
  TaxonomyEntity,
} from '../utils/types'
import { siteUrl } from '../utils/helpers'

/**
 * Get event data from CMS
 */
export default async function eventsFetch(
  dispatch: React.Dispatch<StateAction>,
  dataDispatch: React.Dispatch<DataAction>
) {
  await axios
    .get(`${siteUrl}/wp-json/unt/v1/events`)
    .then(res => {
      // Sort by first performance datetime
      const sortedData = res.data.sort((a: EventEntity, b: EventEntity) => {
        return (
          new Date(a.performances[0].datetime).getTime() -
          new Date(b.performances[0].datetime).getTime()
        )
      })

      // Set Event data to state
      dataDispatch({ type: AppData.SET_DATA, mode: sortedData })

      // List names of taxonomies we want to add to state
      const taxonomyTypes = [
        {
          name: 'genres',
          dispatchKey: AppData.SET_GENRES,
        },
        {
          name: 'seasons',
          dispatchKey: AppData.SET_SEASONS,
        },
      ] as const

      // Generate array of unique terms for each vocabulary
      taxonomyTypes.forEach(taxonomy => {
        const data = res.data
          .map((event: EventEntity) => {
            return event[taxonomy.name].map((term: TaxonomyEntity) => {
              return {
                name: term.name,
                tid: term.tid,
              }
            })
          })
          .flat()
          // Remove duplicates
          .filter(
            (termToCheck: TaxonomyEntity, i: number, terms: TaxonomyEntity[]) =>
              terms.findIndex(
                (term: TaxonomyEntity) => term.tid === termToCheck.tid
              ) === i
          )

        dataDispatch({ type: taxonomy.dispatchKey, mode: data })
      })

      // Finished saving data, disable loading state
      dispatch({ type: AppState.IS_LOADING, mode: false })
    })
    .catch(err => {
      throw Error(err)
    })

  return null
}
