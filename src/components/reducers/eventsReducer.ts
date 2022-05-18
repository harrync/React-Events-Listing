import { Reducer } from 'react'
import { DateUtils } from 'react-day-picker'
import { AppState, State, StateAction } from '../utils/types'

/**
 * Basic state setup
 */
export const initialState: State = {
  loading: true,
  error: false,
  taxonomyFilter: [],
  dateRange: {
    from: new Date(),
    to: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  },
  activeDateButton: null,
  activeDropdown: null,
  postType: 'event',
  resultsCols: 4,
}

// Set up date values
const today = new Date()
const todayPlusSeven = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
const todayPlusFourteen = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)

/**
 * What's on reducer to manage state
 */
export default function eventsReducer<R extends Reducer<State, StateAction>>(
  state: State,
  action: StateAction
) {
  switch (action.type) {
    case AppState.IS_LOADING:
      return {
        ...state,
        loading: action.mode,
      }
    case AppState.ERROR:
      return {
        ...state,
        error: action.mode,
      }
    case AppState.SHOW_ALL:
      return {
        ...state,
        taxonomyFilter: initialState.taxonomyFilter,
        dateRange: initialState.dateRange,
        activeDateButton: initialState.activeDateButton,
        activeDropdown: initialState.activeDropdown,
      }
    case AppState.SET_TODAY:
      return {
        ...state,
        dateRange:
          state.activeDateButton !== action.type
            ? {
                from: today,
                to: today,
              }
            : initialState.dateRange,
        activeDateButton:
          state.activeDateButton !== action.type ? action.type : null,
      }
    case AppState.SET_THIS_WEEK:
      return {
        ...state,
        dateRange:
          state.activeDateButton !== action.type
            ? {
                from: today,
                to: todayPlusSeven,
              }
            : initialState.dateRange,
        activeDateButton:
          state.activeDateButton !== action.type ? action.type : null,
      }
    case AppState.SET_NEXT_WEEK:
      return {
        ...state,
        dateRange:
          state.activeDateButton !== action.type
            ? {
                from: todayPlusSeven,
                to: todayPlusFourteen,
              }
            : initialState.dateRange,
        activeDateButton:
          state.activeDateButton !== action.type ? action.type : null,
      }
    case AppState.TOGGLE_CALENDAR:
      return {
        ...state,
        activeDropdown:
          state.activeDropdown !== action.type ? action.type : null,
      }
    case AppState.PRESET_DATE_RANGE:
      const { from: presetFrom, to: presetTo } = action.mode

      return {
        ...state,
        dateRange: action.mode,
      }
    case AppState.SET_DATE_RANGE:
      const range = DateUtils.addDayToRange(action.mode, state.dateRange)

      return {
        ...state,
        activeDateButton: false,
        dateRange: range,
      }
    case AppState.RESET_CALENDAR:
      return {
        ...state,
        activeDateButton: false,
        dateRange: initialState.dateRange,
      }
    case AppState.TOGGLE_FILTERS:
      return {
        ...state,
        activeDropdown:
          state.activeDropdown !== action.type ? action.type : null,
      }
    case AppState.PRESET_FILTERS:
      return {
        ...state,
        taxonomyFilter: action.mode,
      }
    case AppState.SET_FILTERS:
      const currentTaxoFilters = [...state.taxonomyFilter]
      const matchingTerm = currentTaxoFilters.indexOf(action.mode)

      // If tid is present remove it, else add it to array
      if (matchingTerm > -1) {
        currentTaxoFilters.splice(matchingTerm, 1)
      } else {
        currentTaxoFilters.push(action.mode)
      }

      return {
        ...state,
        taxonomyFilter: currentTaxoFilters,
      }
    default:
      throw Error(`Could not match ${action.type} in reducer`)
  }
}
