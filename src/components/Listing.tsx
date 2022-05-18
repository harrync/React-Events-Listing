import { useState, useContext, useEffect, RefObject, forwardRef } from 'react'
import Pagination from 'react-js-pagination'
import { StateContext } from './WhatsOnInit'
import useEventsFilter from './hooks/useEventsFilter'
import Card from './Card'
import { StateContextT } from './utils/types'

/**
 * Output current page of results & pagination
 */
type Props = {
  noResultsCopy: string
  ref: HTMLDivElement
}

// export default function Listing({ noResultsCopy }: Props) {
const Listing = forwardRef<HTMLDivElement, Props>(function SearchParams(
  { noResultsCopy },
  ref
) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isMounted, setIsMounted] = useState(false)
  const { state, data } = useContext(StateContext) as StateContextT

  const { taxonomyFilter, dateRange, postType } = state
  const { eventData } = data

  const { from, to } = dateRange
  const results = useEventsFilter(eventData, taxonomyFilter, from, to)

  useEffect(() => {
    // Set mounted to allow subsequent renders to fire the scroll to top functionality
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [results?.length])

  useEffect(() => {
    // Scroll to top of view
    isMounted &&
      (ref as RefObject<HTMLDivElement>)?.current?.scrollIntoView({
        behavior: 'smooth',
      })
  }, [currentPage, isMounted, ref])

  // Pagination settings
  const numPerPage = 12
  const lastResultIndex = currentPage * numPerPage
  const firstResultIndex = lastResultIndex - numPerPage
  const currentResults = results?.slice(firstResultIndex, lastResultIndex)

  if (results?.length === 0)
    return <p>{noResultsCopy ? noResultsCopy : 'Sorry, no results found.'}</p>

  return (
    <div className="a-cols a-cols--full">
      <div className="a-listing">
        {currentResults?.map((post, i) => (
          <Card key={i} post={post} type={postType} />
        ))}
      </div>

      <Pagination
        activePage={currentPage}
        itemsCountPerPage={numPerPage}
        totalItemsCount={results ? results.length : 0}
        pageRangeDisplayed={5}
        onChange={pageNumber => setCurrentPage(pageNumber)}
        nextPageText="Next"
        lastPageText="Last"
        prevPageText="Previous"
        firstPageText="First"
        innerClass="a-pager"
        linkClass="noZensmooth"
      />
    </div>
  )
})

export default Listing
