import { htmlDecode } from '../utils/helpers'
import Button from '../ui/button'
import { TaxonomyEntity } from '../utils/types'

/**
 * Output list of term names as buttons to filter results
 */

type Props = {
  taxonomy: TaxonomyEntity[] | null | undefined
  title: string
  showTitle: boolean
  activeButtons: number[]
  clicked: (tid: number) => void
}

export default function TaxonomyFilters({
  taxonomy,
  title,
  showTitle,
  activeButtons,
  clicked,
}: Props) {
  if (!taxonomy) return null

  return (
    <div
      className={`o-listing__dropdown-taxonomy 
      ${
        title && `o-listing__dropdown-${title.toLowerCase().replace(' ', '-')}`
      }`}
    >
      {showTitle ? <h3 className="h4">{title}</h3> : null}

      {taxonomy.map((term: TaxonomyEntity, i: number) => (
        <Button
          clicked={() => clicked(term.tid)}
          key={i}
          classes={`link ${activeButtons.includes(term.tid) ? 'active' : ''}`}
        >
          {htmlDecode(term.name)}
        </Button>
      ))}
    </div>
  )
}
