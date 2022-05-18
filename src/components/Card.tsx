import { useEffect, useState } from 'react'
import { htmlDecode } from './utils/helpers'
import EventDate from './ui/eventDate'
import Copy from './ui/excerpt'
import Link from './ui/link'
import Button from './ui/button'
import { EventEntity } from './utils/types'
import PerformancesModal from './PerformancesModal'
import BookLink from './ui/bookLink'
import Thumbnail from './ui/thumbnail'

type Props = {
  post: EventEntity
  type: string
}

/**
 * General purpose card
 */
export default function Card({ post, type }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    document.addEventListener(
      'keydown',
      e => {
        if (e.key === 'Escape') {
          closeModal()
        }
      },
      false
    )

    return () => {
      document.removeEventListener(
        'keydown',
        e => {
          if (e.key === 'Escape') {
            closeModal()
          }
        },
        false
      )
    }
  }, [])

  function openModal() {
    setModalOpen(true)
    document.body.setAttribute('data-modalOpen', 'true')
  }

  function closeModal() {
    setModalOpen(false)
    document.body.setAttribute('data-modalOpen', 'false')
  }

  const postTitle = htmlDecode(post.title)

  // Event booking button logic
  let bookButton

  if (post.performances.length > 1) {
    // multi perfs
    if (post?.book?.url) {
      // If event has book button override
      bookButton = (
        <BookLink
          eventTitle={post.title}
          link={post.book}
          classes={'a-btn a-btn--narrow a-btn--hollow'}
        />
      )
    } else {
      bookButton = (
        <>
          <Button
            target={`${post.id}-performances`}
            classes="a-btn a-btn--narrow a-btn--hollow a-modal"
            ariaLabel="Open booking modal"
            clicked={openModal}
          >
            Book tickets
          </Button>
          <PerformancesModal
            event={post}
            visible={modalOpen}
            onClose={closeModal}
          />
        </>
      )
    }
  } else {
    // single perf
    const singlePerfButton = post.performances[0].book
      ? post.performances[0].book
      : post.book

    bookButton = (
      <BookLink
        eventTitle={post.title}
        link={singlePerfButton}
        classes={'a-btn a-btn--narrow a-btn--hollow'}
      />
    )
  }

  return (
    <article className="o-listing-teaser">
      {<Thumbnail post={post} />}

      <div className="o-listing-teaser__content">
        {post.genres.length > 0 ? (
          <p className="tag">
            {post.genres.map(genre => htmlDecode(genre.name))}
          </p>
        ) : null}

        <h2 className="h2">
          <Link href={post.link} title={`View ${postTitle}`} tabIndex={-1}>
            {postTitle}
          </Link>
        </h2>

        {post.performances.length > 0 || post.price ? (
          <p>
            {post.performances.length > 0 ? <EventDate event={post} /> : null}
            {post.price ? ` | ${post.price}` : null}
          </p>
        ) : null}

        {post.excerpt && <Copy copy={post.excerpt} />}

        <div className="o-listing-teaser__buttons">
          {bookButton}

          <Link
            href={post.link}
            classes={'read-more'}
            title={`Read more about ${postTitle}`}
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  )
}
