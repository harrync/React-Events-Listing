import { htmlDecode } from '../utils/helpers'
import { LinkEntity } from '../utils/types'

/**
 * Book buttons
 */
type Props = {
  eventTitle: string
  link: LinkEntity
  classes: string
}

export default function BookLink({ eventTitle, link, classes }: Props) {
  const isSoldOut = link.url === '#' && !link.title ? true : false
  const isDisabled = link.url === '#' && link.title ? true : false
  const label = isSoldOut ? 'Sold out' : link.title ? link.title : 'Book now'

  if (!link.title && !link.url) {
    return null
  }

  return (
    <a
      href={isSoldOut ? '/' : link.url}
      className={`${classes} ${isSoldOut || isDisabled ? ' no-link' : ''} ${
        isSoldOut ? ' a-btn--hollow' : ''
      }`}
      title={`Book tickets for ${htmlDecode(eventTitle)}`}
      target={link.target}
    >
      {label}

      {!isSoldOut && !isDisabled && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.147"
          height="8.424"
          viewBox="0 0 13.147 8.424"
        >
          <path
            d="M7.148 0L9.14 3.712H0v1h9.14L7.148 8.424h.735l5.265-4.212L7.883 0z"
            fill="#0e2f34"
          />
        </svg>
      )}
    </a>
  )
}
