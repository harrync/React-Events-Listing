import { Reducer } from 'react'
import { AppData, DataAction, Data } from '../utils/types'

// Basic state setup
export const initialData: Data = {
  eventData: [],
  genres: [],
  seasons: [],
}

/**
 * What's on reducer to manage state
 */
export default function eventsData<R extends Reducer<Data, DataAction>>(
  state: Data,
  action: DataAction
) {
  switch (action.type) {
    case AppData.SET_DATA:
      return {
        ...state,
        eventData: action.mode,
      }
    case AppData.SET_GENRES:
      return {
        ...state,
        genres: action.mode,
      }
    case AppData.SET_SEASONS:
      return {
        ...state,
        seasons: action.mode,
      }
    default:
      throw new Error('Unknown action')
  }
}
