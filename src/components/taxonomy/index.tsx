import { useContext } from 'react'
import { StateContext, DispatchContext } from '../WhatsOnInit'
import Button from '../ui/button'
import TaxonomyPicker from './TaxonomyPicker'
import { AppState, DispatchContextT, StateContextT } from '../utils/types'

/**
 * Set taxonomy filters
 */
export default function FilterByTaxonomy() {
  const { state, data } = useContext(StateContext) as StateContextT
  const { activeDropdown, taxonomyFilter } = state
  const { genres, seasons } = data
  const { dispatch } = useContext(DispatchContext) as DispatchContextT

  return (
    <>
      <Button
        clicked={() => dispatch({ type: AppState.TOGGLE_FILTERS })}
        active={
          activeDropdown === AppState.TOGGLE_FILTERS ||
          taxonomyFilter.length > 0
        }
        classes={'btn h2 btn--dropdown'}
      >
        {activeDropdown === AppState.TOGGLE_FILTERS
          ? 'Close filter -'
          : 'Filter +'}
      </Button>

      {activeDropdown === AppState.TOGGLE_FILTERS && (
        <TaxonomyPicker
          classes={'o-listing__dropdown o-listing__dropdown-filters'}
          clicked={(tid: number) =>
            dispatch({ type: AppState.SET_FILTERS, mode: tid })
          }
          activeTerms={taxonomyFilter}
          taxonomies={[
            { title: 'Types', showTitle: true, data: genres },
            { title: 'Series', showTitle: true, data: seasons },
          ]}
        />
      )}
    </>
  )
}
