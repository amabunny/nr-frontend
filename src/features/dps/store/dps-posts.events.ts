import { createEffect, createEvent } from 'effector'
import { DpsModelService, IGetCityDpsPosts } from 'services/models'

export const loadPosts = createEffect((params: IGetCityDpsPosts) => (
  DpsModelService.getCityDpsPosts(params)
))

export const changeFilters = createEvent<Partial<IGetCityDpsPosts>>()
