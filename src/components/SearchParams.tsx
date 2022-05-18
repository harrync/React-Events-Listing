import {
  useContext,
  useEffect,
  RefObject,
  useCallback,
  forwardRef,
  ReactNode,
} from 'react'
import { StateContext, DispatchContext } from './WhatsOnInit'
import { formatDateUrl } from './utils/helpers'
import queryString from 'query-string'
import { AppState, DispatchContextT, StateContextT } from './utils/types'

type Props = {
  children: ReactNode
  classes: string
  ref: HTMLDivElement
}
interface Params {
  type?: string
  from?: string
  to?: string
}

/**
 * Set search params based on initial url params & app state
 */
const SearchParams = forwardRef<HTMLDivElement, Props>(function SearchParams(
  { children, classes },
  ref
) {
  // const page = forwardRef(ref)
  const { state } = useContext(StateContext) as StateContextT
  const { taxonomyFilter, dateRange } = state
  const { dispatch } = useContext(DispatchContext) as DispatchContextT

  const { from, to } = dateRange

  // Filter results based on URL query params
  const filterBySearchParams = useCallback(
    (params: Params) => {
      const { type, from: paramsFrom, to: paramsTo } = params

      if (type !== undefined && type.length > 0) {
        // Get string of term IDs and convert to array of tid integers
        const taxonomyTerms = type
          .split(',')
          .map((tid: string) => parseInt(tid, 10))

        dispatch({ type: AppState.PRESET_FILTERS, mode: taxonomyTerms })
      }

      if (paramsFrom && paramsTo) {
        // Convert legible dates back to date object
        dispatch({
          type: AppState.PRESET_DATE_RANGE,
          mode: { from: new Date(paramsFrom), to: new Date(paramsTo) },
        })
      }
    },
    [dispatch]
  )

  // Handler for checking whether results need refiltering on history change
  const handlePopstate = useCallback(
    (e: PopStateEvent) => {
      if (e.state) {
        filterBySearchParams(e.state.searchParams)
      }
    },
    [filterBySearchParams]
  )

  useEffect(() => {
    // If querystring found on URL, set filter state accordingly
    const parsed = queryString.parse(window.location.search)
    filterBySearchParams(parsed)

    // Listen to history changes in browser & check whether results need refiltering
    window.addEventListener('popstate', handlePopstate)
    return () => window.removeEventListener('popstate', handlePopstate)
  }, [filterBySearchParams, handlePopstate])

  useEffect(() => {
    // Default querystring value
    let queryStringValue = 'see-all'

    const searchParams = {
      type: taxonomyFilter,
      from: from ? formatDateUrl(from) : undefined,
      to: to ? formatDateUrl(to) : undefined,
    }

    // Add filter data to URL params
    if (searchParams.type.length > 0 || searchParams.to) {
      queryStringValue = queryString.stringify(searchParams, {
        arrayFormat: 'comma',
      })

      // If URL params present, scroll to top of view
      ;(ref as RefObject<HTMLDivElement>)?.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }

    window.history.pushState(
      { searchParams },
      'Filter results',
      `?${queryStringValue}`
    )
  }, [from, ref, taxonomyFilter, to])

  return (
    <section ref={ref} className={classes}>
      {children}
    </section>
  )
})

export default SearchParams
