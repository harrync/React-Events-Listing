import { useContext } from 'react'
import { StateContext, DispatchContext } from './WhatsOnInit'
import Button from './ui/button'
import { AppState, DispatchContextT, StateContextT } from './utils/types'

export default function DateButtons() {
  const { state } = useContext(StateContext) as StateContextT
  const { activeDateButton } = state
  const { dispatch } = useContext(DispatchContext) as DispatchContextT

  const dateButtonLabels = [
    { name: AppState.SET_TODAY, label: 'Today' },
    { name: AppState.SET_THIS_WEEK, label: 'This Week' },
    { name: AppState.SET_NEXT_WEEK, label: 'Next Week' },
  ]

  return (
    <>
      {dateButtonLabels.map((button, i) => (
        <Button
          key={i}
          clicked={() => dispatch({ type: button.name })}
          active={activeDateButton === button.name}
          classes={'btn h2'}
        >
          {button.label}
        </Button>
      ))}
    </>
  )
}
