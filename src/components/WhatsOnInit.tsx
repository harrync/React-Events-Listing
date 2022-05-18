import {
  useReducer,
  createContext,
  useEffect,
  ReducerWithoutAction,
} from 'react'
import eventsData, { initialData } from './reducers/eventsData'
import eventsReducer, { initialState } from './reducers/eventsReducer'
import { DispatchContextT, StateContextT, State } from './utils/types'
import WhatsOnContainer from './WhatsOnContainer'
import eventsFetch from './data/eventsFetch'

export const StateContext = createContext<StateContextT | null>(null)
export const DispatchContext = createContext<DispatchContextT | null>(null)

/*
 * TODO
 * - Check if results change but number of them change
 * - popstate issues
 */

/**
 * Get data, set state & prepare app
 */
type Props = {
  noResultsCopy: string
}

export default function WhatsOn({ noResultsCopy }: Props) {
  const [state, dispatch] = useReducer(eventsReducer, initialState)
  const [data, dataDispatch] = useReducer(
    eventsData as ReducerWithoutAction<any>,
    initialData as State
  )

  // Get WP post data
  useEffect(() => {
    eventsFetch(dispatch, dataDispatch)
  }, [])

  return (
    <DispatchContext.Provider value={{ dispatch, dataDispatch }}>
      <StateContext.Provider value={{ state, data }}>
        <WhatsOnContainer noResultsCopy={noResultsCopy} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
