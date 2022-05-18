import { EventEntity } from '../utils/types'
import { parse, format } from 'date-fns'

/**
 * Create event date that covers single & multi perf events
 */
type Props = {
  event: EventEntity
}

export default function EventDate({ event }: Props) {
  let eventDate = '' as string

  const startDate = parse(
    event.calculated_start_date,
    'yyyy-MM-dd HH:mm:ss',
    new Date()
  )
  const endDate = parse(
    event.calculated_end_date,
    'yyyy-MM-dd HH:mm:ss',
    new Date()
  )

  if (event.calculated_start_date === event.calculated_end_date) {
    if (format(endDate, 'mm') === '00') {
      eventDate = format(endDate, 'haaa, d MMM yyyy')
    } else {
      eventDate = format(endDate, 'h:mmaaa, d MMM yyyy')
    }
  } else {
    eventDate = `${format(startDate, 'd MMM')} - ${format(
      endDate,
      'd MMM yyyy'
    )}`
  }

  return <>{eventDate}</>
}
