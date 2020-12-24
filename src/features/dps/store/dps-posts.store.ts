import { createStore, attach, forward } from 'effector'
import { IPost } from '@dps-models'
import { IGetCityDpsPosts } from 'services/models'
import { loadPosts, changeFilters, init, writeFiltersToLocalStorage, readLocalStorageFilters } from './dps-posts.events'

const $posts = createStore<IPost[]>([])
const $postsFilters = createStore<IGetCityDpsPosts>({ offset: 1 })
const $lastLoadedTime = createStore<Date | null>(null)

$posts
  .on(loadPosts, () => [])
  .on(loadPosts.doneData, (state, { data }) => data)

$postsFilters
  .on(readLocalStorageFilters.doneData, (state, payload) => ({ ...state, ...payload }))
  .on(changeFilters, (state, payload) => ({ ...state, ...payload }))

$lastLoadedTime
  .on(loadPosts.done, () => new Date())

const $postsLoading = loadPosts.pending

const loadPostsWithFilters = attach({
  effect: loadPosts,
  source: $postsFilters
})

forward({
  from: changeFilters,
  to: writeFiltersToLocalStorage
})

forward({
  from: init,
  to: [readLocalStorageFilters, loadPostsWithFilters]
})

export {
  $posts,
  $postsLoading,
  $lastLoadedTime,
  $postsFilters,
  loadPostsWithFilters as loadPosts,
  changeFilters,
  init
}
