import { hostApi } from 'api'
import { IPost } from '@dps-models'

export class DpsModelService {
  public static getCityDpsPosts (params?: IGetCityDpsPosts) {
    return hostApi.get<IPost[]>('dps/city', { params })
  }
}

export interface IGetCityDpsPosts {
  offset?: number
}
