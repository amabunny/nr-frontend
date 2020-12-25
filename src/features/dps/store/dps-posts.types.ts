import { IGetCityDpsPosts } from 'services/models'

export interface ISearchFilters extends IGetCityDpsPosts {
  search: string
  tags: string[]
}

export const DEFAULT_TAGS = [
  'миха',
  'бельский',
  'рощ'
]
