import { createStore, attach } from 'effector'
import { IPost } from '@dps-models'
import { IGetCityDpsPosts } from 'services/models'
import { loadPosts, changeFilters } from './dps-posts.events'

const $posts = createStore<IPost[]>([])
const $postsFilters = createStore<IGetCityDpsPosts>({ offset: 1 })
const $lastLoadedTime = createStore<Date | null>(null)

$posts
  .on(loadPosts, () => [])
  .on(loadPosts.doneData, (state, { data }) => data)

$postsFilters
  .on(changeFilters, (state, payload) => ({ ...state, ...payload }))

$lastLoadedTime
  .on(loadPosts.done, () => new Date())

const $postsLoading = loadPosts.pending

const loadPostsWithFilters = attach({
  effect: loadPosts,
  source: $postsFilters
})

export {
  $posts,
  $postsLoading,
  $lastLoadedTime,
  $postsFilters,
  loadPostsWithFilters as loadPosts,
  changeFilters
}
