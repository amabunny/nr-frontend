import React from 'react'
import { useStore } from 'effector-react'
import { Tag } from 'antd'
import { DpsPostsModel } from '../../store'
import { FormattedMessage } from 'react-intl'

export const Tags = () => {
  const { search, tags } = useStore(DpsPostsModel.$postsFilters)

  const onSearchTagClick = () => {
    DpsPostsModel.changeFilters({ search: '' })
  }

  return (
    <>
      {search && (
        <Tag.CheckableTag
          checked
          onClick={onSearchTagClick}
        >
          <FormattedMessage id={'dps.filters.searchTag'} /> {search}
        </Tag.CheckableTag>
      )}

      {DpsPostsModel.DEFAULT_TAGS.map(tag =>
        <Tag.CheckableTag
          checked={tags.includes(tag)}
          key={tag}
          onChange={() => DpsPostsModel.toggleTag(tag)}
        >
          {tag}
        </Tag.CheckableTag>
      )}
    </>
  )
}
