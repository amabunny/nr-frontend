import { IGetCityDpsPosts } from 'services/models'
import { IPost } from '@dps-models'

export const DEFAULT_TAGS = [
  'миха',
  'бельский',
  'рощ',
  'элеватор',
  'запад',
  'худ',
  'дружб',
  'фабри',
  'арбат',
  'вокзал',
  'поворот',
  'черномор',
  'дтп',
  'авария'
]

export interface ISearchFilters extends IGetCityDpsPosts {
  search: string
  tags: string[]
}

export type ExtractedTimeTypes =
  | {
    type: 'minutes_ago'
    count: number
    word: string
  }
  | {
    type: 'hours_ago'
    count: string
    word: string
  }
  | {
    type: 'number'
    time: string
  }
  | {
    type: 'empty'
  }

export interface INormalizedPost extends Omit<IPost, 'time'> {
  time: ExtractedTimeTypes
}
