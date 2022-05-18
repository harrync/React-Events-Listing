import { useContext, useRef } from 'react'
import { StateContext } from './WhatsOnInit'
import Loader from './ui/loader'
import SearchParams from './SearchParams'
import Listing from './Listing'
import ActiveFilters from './ActiveFilters'
import Filters from './Filters'
import { StateContextT } from './utils/types'

/**
 * Main layout
 */
type Props = {
  noResultsCopy: string
}

export default function WhatsOnContainer({ noResultsCopy }: Props) {
  const { state } = useContext(StateContext) as StateContextT
  const { loading, error } = state
  const ref = useRef<HTMLDivElement>(null)

  if (error) {
    return (
      <p>
        Error{' '}
        <span role="img" aria-label="Warning emoji">
          ⚠️
        </span>
      </p>
    )
  }

  if (loading) {
    return <Loader />
  }

  return (
    <SearchParams ref={ref} classes={`o-listing`}>
      <Filters />
      <ActiveFilters />
      <Listing noResultsCopy={noResultsCopy} ref={ref} />
    </SearchParams>
  )
}
