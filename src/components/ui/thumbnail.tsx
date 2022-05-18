import { htmlDecode } from '../utils/helpers'
import { EventEntity } from '../utils/types'
import Link from './link'

type Props = {
  post: EventEntity
}

export default function Thumbnail({ post }: Props) {
  const imageSizes = Object.entries(post.imageSizes)

  const sources = imageSizes.map((imageSize, i) => {
    const sizes = Object.values(imageSize[1])

    return (
      <source
        key={i}
        media={`(max-width: ${imageSize[0]}px)`}
        srcSet={`${sizes[0]} 1x, ${sizes[1]} 2x`}
        type="image/jpeg"
      ></source>
    )
  })

  return (
    <Link
      href={post.link}
      classes={'o-listing-teaser__thumb'}
      ariaLabel={`Link to ${htmlDecode(post.title)}`}
      tabIndex={-1}
      title={`Thumbnail for ${htmlDecode(post.title)}`}
    >
      <figure className={post.imageCrop ? post.imageCrop : undefined}>
        <picture>
          {sources}
          <img
            src={post.image}
            alt={
              post.imageAlt
                ? post.imageAlt
                : `Thumbnail for ${htmlDecode(post.title)}`
            }
            loading="lazy"
          />
        </picture>
      </figure>
    </Link>
  )
}
