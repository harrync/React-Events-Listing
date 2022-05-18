import TaxonomyFilters from './TaxonomyFilters'
import { TaxonomiesGroup } from '../utils/types'

type Props = {
  clicked: (tid: number) => void
  activeTerms: number[]
  taxonomies: TaxonomiesGroup[] | null
  classes: string
}

/**
 * Dropdown component containing available terms to filter by
 */
export default function TaxonomyPicker({
  clicked,
  activeTerms,
  taxonomies,
  classes,
}: Props) {
  return (
    <div className={classes}>
      <div className="a-cols a-cols--full">
        {taxonomies?.map((taxonomy: TaxonomiesGroup, i: number) => (
          <TaxonomyFilters
            key={i}
            title={taxonomy.title}
            showTitle={taxonomy.showTitle}
            taxonomy={taxonomy ? taxonomy?.data : null}
            clicked={clicked}
            activeButtons={activeTerms}
          />
        ))}
      </div>
    </div>
  )
}
