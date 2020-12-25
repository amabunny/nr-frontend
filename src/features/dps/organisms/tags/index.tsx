import React from 'react'
import { useStore } from 'effector-react'
import { Tag, Collapse, Row, Col } from 'antd'
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
        <div style={{ marginBottom: 10 }}>
          <Tag.CheckableTag
            checked
            onClick={onSearchTagClick}
          >
            <FormattedMessage id={'dps.filters.searchTag'} /> {search}
          </Tag.CheckableTag>
        </div>
      )}

      <Collapse>
        <Collapse.Panel
          header={<FormattedMessage id={'dps.filters.tags'} />}
          key={'1'}
        >
          <Row gutter={[8, 8]}>
            {DpsPostsModel.DEFAULT_TAGS.map(tag =>
              <Col>
                <Tag.CheckableTag
                  checked={tags.includes(tag)}
                  key={tag}
                  onChange={() => DpsPostsModel.toggleTag(tag)}
                >
                  {tag}
                </Tag.CheckableTag>
              </Col>
            )}
          </Row>
        </Collapse.Panel>
      </Collapse>
    </>
  )
}
