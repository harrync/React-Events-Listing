import { MouseEvent } from 'react'
import EventDate from './ui/eventDate'
import { htmlDecode } from './utils/helpers'
import { EventEntity } from './utils/types'
import BookLink from './ui/bookLink'
import { parse, format } from 'date-fns'

/**
 * Event performances modal
 */

type Props = {
  event: EventEntity
  visible: boolean
  onClose: (e?: MouseEvent<HTMLElement>) => void
}

export default function PerformancesModal({ event, visible, onClose }: Props) {
  const performances = event.performances.map((performance, i) => {
    const performanceDate = parse(
      performance.datetime,
      'yyyy-MM-dd HH:mm:ss',
      new Date()
    )

    return (
      <div key={i} className="m-performances__performance">
        <time>{performance.time}</time>
        <time>{format(performanceDate, 'EEEE d LLLL, yyyy')}</time>
        <BookLink
          eventTitle={event.title}
          link={performance.book}
          classes={'a-btn a-btn--narrow a-btn--fullWidth'}
        />
      </div>
    )
  })

  if (!visible) {
    return null
  }

  return (
    <dialog
      className="o-modal m-performances"
      id={`${event.id}-performances`}
      data-visible={visible}
    >
      <div className="m-performances__inner">
        <div className="a-cols a-cols--md">
          <h2 className="centered">{htmlDecode(event.title)}</h2>
          <p className="centered">
            <EventDate event={event} />
          </p>
        </div>

        <div className="m-performances__performances">{performances}</div>

        <button
          type="button"
          className="o-modal__close"
          aria-label="Close performances modal"
          onClick={onClose}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M0.849976 0.850098L24.2 24.2001"
                stroke="#0E2F34"
                strokeWidth="2.405"
              />
              <path
                d="M24.2 0.850098L0.849976 24.2001"
                stroke="#0E2F34"
                strokeWidth="2.405"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="25.05" height="25.05" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </dialog>
  )
}
