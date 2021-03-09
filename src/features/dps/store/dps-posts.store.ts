import { createStore, attach, forward, guard, combine, Store } from 'effector'
import { IPost } from '@dps-models'
import { IGetCityDpsPosts } from 'services/models'
import { debounce } from 'patronum'
import {
  loadPosts, changeFilters, init, writeFiltersToLocalStorage, toggleTag,
  readLocalStorageFilters, guardedLoadPosts, refreshPosts, runSearch, IRunSearch
} from './dps-posts.events'
import { ISearchFilters, DEFAULT_TAGS } from './dps-posts.types'
import { extractTimeFromString } from './dps-posts.utils'

const $posts = createStore<IPost[]>([])
const $showingPosts = createStore<IPost[]>([])
const $postsFilters = createStore<ISearchFilters>({ offset: 1, search: '', tags: [] })
const $lastLoadedTime = createStore<Date | null>(null)

$posts
  .on(loadPosts, () => [])
  .on(loadPosts.doneData, (state, { data }) => data)

$showingPosts
  .on($posts, (_, actualPosts) => actualPosts)
  .on(runSearch.doneData, (_, searchedPosts) => searchedPosts)

$postsFilters
  .on(readLocalStorageFilters.doneData, (state, payload) => ({ ...state, ...payload }))
  .on(changeFilters, (state, payload) => ({ ...state, ...payload }))
  .on(toggleTag, ({ tags, ...eachFilters }, togglingTag) => tags.includes(togglingTag)
    ? ({
      ...eachFilters,
      tags: tags.filter(filteringTag => filteringTag !== togglingTag)
    })
    : ({
      ...eachFilters,
      tags: [...tags, togglingTag]
    })
  )

$lastLoadedTime
  .on(loadPosts.done, () => new Date())

const $refreshNeed = createStore(false)
  .on($postsFilters.map(({ offset }) => offset).updates, () => true)
  .on(loadPosts.done, () => false)

const $postsLoading = loadPosts.pending
const $mappedEndpointParams = $postsFilters.map(({ offset }): IGetCityDpsPosts => ({ offset }))

const $timeExtractedPosts = $showingPosts.map(showingPosts => showingPosts.map(post => ({
  ...post,
  time: extractTimeFromString(post.time)
})))

$timeExtractedPosts.watch(console.log)

const loadPostsWithFilters = attach({
  effect: loadPosts,
  source: $mappedEndpointParams
})

const $searchParams: Store<IRunSearch> = combine(
  $postsFilters,
  $posts,
  ({ search, tags }, posts): IRunSearch => ({ posts, searchString: search, tags })
)

const runSearchWithParams = attach({
  effect: runSearch,
  source: $searchParams
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
  from: [debouncedSearch, loadPosts.done, $postsFilters.map(({ tags }) => tags).updates],
  to: runSearchWithParams
})

guard({
  source: guardedLoadPosts,
  filter: $refreshNeed,
  target: loadPostsWithFilters
})

export {
  $timeExtractedPosts as $posts,
  $postsLoading,
  $lastLoadedTime,
  $postsFilters,
  guardedLoadPosts as loadPosts,
  refreshPosts,
  changeFilters,
  toggleTag,
  init,
  DEFAULT_TAGS
}
