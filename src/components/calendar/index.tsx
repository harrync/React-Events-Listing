import { useContext } from 'react'
import { StateContext, DispatchContext } from '../WhatsOnInit'
import Button from '../ui/button'
import DatePicker from './DatePicker'
import { AppState, DispatchContextT, StateContextT } from '../utils/types'

/**
 * Set date range filters
 */
export default function FilterByDatePicker() {
  const { state } = useContext(StateContext) as StateContextT
  const { activeDropdown, dateRange } = state
  const { dispatch } = useContext(DispatchContext) as DispatchContextT

  const { from, to } = dateRange
  if (!from && !to) return null

  return (
    <>
      <Button
        clicked={() => dispatch({ type: AppState.TOGGLE_CALENDAR })}
        active={
          activeDropdown === AppState.TOGGLE_CALENDAR || to instanceof Date
        }
        classes={'btn h2 btn--dropdown'}
      >
        {activeDropdown === AppState.TOGGLE_CALENDAR
          ? 'Close calendar'
          : 'Calendar'}
      </Button>

      {activeDropdown === AppState.TOGGLE_CALENDAR && (
        <DatePicker
          classes={'o-listing__dropdown o-listing__dropdown-calendar'}
          from={from}
          to={to}
          reset={() => dispatch({ type: AppState.RESET_CALENDAR })}
          clicked={(day: Date) =>
            dispatch({ type: AppState.SET_DATE_RANGE, mode: day })
          }
        />
      )}
    </>
  )
}
