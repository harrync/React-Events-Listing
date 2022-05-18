import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Button from '../ui/button'

type Props = {
  from: Date | undefined
  to: Date | undefined
  reset: () => void
  clicked: (day: Date) => void
  classes: string
}

export default function DatePicker({
  from,
  to,
  reset,
  clicked,
  classes,
}: Props) {
  const modifiers = { start: from, end: to }

  return (
    <div className={classes}>
      <div className="a-cols a-cols--full">
        <DayPicker
          className="a-date-picker"
          numberOfMonths={2}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={clicked}
        />
        <div className="o-listing__dropdown-calendar-controls">
          {from && !to ? <p>Please select an end date</p> : null}
          <Button clicked={reset} classes="a-btn a-btn--sm">
            Clear selection
          </Button>
        </div>
      </div>
    </div>
  )
}
