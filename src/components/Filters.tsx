import DateButtons from './DateButtons'
import FilterByDatePicker from './calendar'
import FilterByTaxonomy from './taxonomy'

export default function Filters() {
  return (
    <div className="o-listing__filters">
      <DateButtons />
      <FilterByDatePicker />
      <span className="btn divider">&nbsp;</span>
      <FilterByTaxonomy />
    </div>
  )
}
