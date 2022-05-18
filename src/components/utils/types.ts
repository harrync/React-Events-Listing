export enum AppData {
  SET_DATA = 'SET_DATA',
  SET_GENRES = 'SET_GENRES',
  SET_SEASONS = 'SET_SEASONS',
}

export enum AppState {
  IS_LOADING = 'IS_LOADING',
  ERROR = 'ERROR',
  SHOW_ALL = 'SHOW_ALL',
  SET_TODAY = 'SET_TODAY',
  SET_THIS_WEEK = 'SET_THIS_WEEK',
  SET_NEXT_WEEK = 'SET_NEXT_WEEK',
  TOGGLE_CALENDAR = 'TOGGLE_CALENDAR',
  PRESET_DATE_RANGE = 'PRESET_DATE_RANGE',
  SET_DATE_RANGE = 'SET_DATE_RANGE',
  RESET_CALENDAR = 'RESET_CALENDAR',
  TOGGLE_FILTERS = 'TOGGLE_FILTERS',
  PRESET_FILTERS = 'PRESET_FILTERS',
  SET_FILTERS = 'SET_FILTERS',
}

export type StateContextT = {
  state: State
  data: Data
}

export type DispatchContextT = {
  dispatch: React.Dispatch<any>
  dataDispatch: React.Dispatch<any>
}

export type State = {
  loading: boolean
  error: boolean
  taxonomyFilter: number[]
  dateRange: DateRangeObject
  activeDateButton: string | boolean | null
  activeDropdown: string | null
  postType: string
  resultsCols: number
}

export type Data = {
  eventData?: EventEntity[]
  genres?: TaxonomyEntity[]
  seasons?: TaxonomyEntity[]
}

export type DataAction = {
  type: AppData
  mode: EventEntity[] | TaxonomyEntity[]
}

export type StateAction = {
  type: AppState
  mode: any
}

export type EventEntity = {
  id: number
  title: string
  excerpt?: string
  price?: string
  slug: string
  link: string
  image?: string
  imageCrop?: string
  imageAlt?: string
  imageSizes: [string]
  genres: TaxonomyEntity[]
  seasons: TaxonomyEntity[]
  eventId: number
  duration: string
  onSale: boolean
  performances: PerformanceEntity[]
  book: LinkEntity
  calculated_start_date: string
  calculated_end_date: string
}

export type TaxonomyEntity = {
  tid: number
  name: string
  slug?: string
}

export type PerformanceEntity = {
  id: number
  capacity: number
  numberSold: number
  availability: number
  datetime: string
  date: string
  time: string
  book: LinkEntity
}

export type TaxonomiesGroup = {
  title: string
  showTitle: boolean
  data?: TaxonomyEntity[] | null
}

export type DateRangeObject = {
  from: Date
  to: Date
}

export type LinkEntity = {
  target?: string
  title?: string
  url: string
}
