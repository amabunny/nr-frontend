import { createEffect, createEvent } from 'effector'
import { DpsModelService, IGetCityDpsPosts } from 'services/models'

const LOCAL_STORAGE_KEY = '@DPS-POSTS/filters'

export const loadPosts = createEffect((params: IGetCityDpsPosts) => (
  DpsModelService.getCityDpsPosts(params)
))

export const changeFilters = createEvent<Partial<IGetCityDpsPosts>>()

export const readLocalStorageFilters = createEffect((): IGetCityDpsPosts => (
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'null')
))

export const writeFiltersToLocalStorage = createEffect((params: IGetCityDpsPosts) => (
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(params))
))

export const init = createEvent()
