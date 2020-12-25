import { IGetCityDpsPosts } from 'services/models'

export interface ISearchFilters extends IGetCityDpsPosts {
  search: string
}
