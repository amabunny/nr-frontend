import { createStore, attach, forward, guard, combine } from 'effector'
import { IPost } from '@dps-models'
import { IGetCityDpsPosts } from 'services/models'
import { debounce } from 'patronum'
import {
  loadPosts, changeFilters, init, writeFiltersToLocalStorage,
  readLocalStorageFilters, guardedLoadPosts, refreshPosts, runSearch
} from './dps-posts.events'
import { ISearchFilters } from './dps-posts.types'

const $posts = createStore<IPost[]>([])
const $showingPosts = createStore<IPost[]>([])
const $postsFilters = createStore<ISearchFilters>({ offset: 1, search: '' })
const $lastLoadedTime = createStore<Date | null>(null)
const $tags = createStore<string[]>([])

$posts
  .on(loadPosts, () => [])
  .on(loadPosts.doneData, (state, { data }) => data)

$showingPosts
  .on($posts, (_, actualPosts) => actualPosts)
  .on(runSearch.doneData, (_, searchedPosts) => searchedPosts)

$postsFilters
  .on(readLocalStorageFilters.doneData, (state, payload) => ({ ...state, ...payload }))
  .on(changeFilters, (state, payload) => ({ ...state, ...payload }))

$lastLoadedTime
  .on(loadPosts.done, () => new Date())

const $refreshNeed = createStore(false)
  .on($postsFilters.map(({ offset }) => offset).updates, () => true)
  .on(loadPosts.done, () => false)

const $postsLoading = loadPosts.pending
const $mappedEndpointParams = $postsFilters.map(({ offset }): IGetCityDpsPosts => ({ offset }))

const loadPostsWithFilters = attach({
  effect: loadPosts,
  source: $mappedEndpointParams
})

const runSearchWithParams = attach({
  effect: runSearch,
  source: combine({
    searchString: $postsFilters.map(({ search }) => search),
    posts: $posts
  })
})

forward({
  from: $postsFilters.updates,
  to: writeFiltersToLocalStorage
})

forward({
  from: init,
  to: [readLocalStorageFilters, loadPostsWithFilters]
})

forward({
  from: refreshPosts,
  to: loadPostsWithFilters
})

const debouncedSearch = debounce({
  source: $postsFilters.map(({ search }) => search).updates,
  timeout: 500
})

forward({
  from: [debouncedSearch, loadPosts.done],
  to: runSearchWithParams
})

guard({
  source: guardedLoadPosts,
  filter: $refreshNeed,
  target: loadPostsWithFilters
})

export {
  $showingPosts as $posts,
  $postsLoading,
  $lastLoadedTime,
  $postsFilters,
  $tags,
  guardedLoadPosts as loadPosts,
  refreshPosts,
  changeFilters,
  init
}
