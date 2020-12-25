import { createEffect, createEvent } from 'effector'
import { DpsModelService, IGetCityDpsPosts } from 'services/models'
import { IPost } from '@dps-models'
import { ISearchFilters } from './dps-posts.types'

export const loadPosts = createEffect((params: IGetCityDpsPosts) => (
  DpsModelService.getCityDpsPosts(params)
))

const LOCAL_STORAGE_KEY = '@DPS-POSTS/filters'

export const readLocalStorageFilters = createEffect((): ISearchFilters => (
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'null')
))
export const writeFiltersToLocalStorage = createEffect((params: ISearchFilters) => (
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(params))
))
export const runSearch = createEffect(({ posts, searchString, tags }: IRunSearch): Promise<IPost[]> => new Promise((resolve) =>
  resolve(posts.filter(({ text }) =>
    tags?.length
      ? (
        tags?.some(tag => text?.toLowerCase().includes(tag.toLowerCase())) ||
        (searchString && text?.toLowerCase().includes(searchString))
      )
      : (
        text?.toLowerCase().includes(searchString.toLowerCase())
      )
  ))
))

export const init = createEvent()
export const guardedLoadPosts = createEvent()
export const refreshPosts = createEvent()
export const changeFilters = createEvent<Partial<ISearchFilters>>()

export const toggleTag = createEvent<string>()

export interface IRunSearch {
  posts: IPost[]
  searchString: string
  tags?: string[]
}
