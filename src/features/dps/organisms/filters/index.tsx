import React from 'react'
import { Row, Col, Collapse, Form, InputNumber } from 'antd'
import { useStore } from 'effector-react'
import { FilterOutlined } from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'
import { DpsPostsModel } from '../../store'

const $offsetInput = DpsPostsModel.$postsFilters.map(({ offset }) => offset)

export const Filters = () => {
  const offsetInput = useStore($offsetInput)

  return (
    <Collapse>
      <Collapse.Panel
        header={(
          <Row gutter={8}>
            <Col>
              <FilterOutlined />
            </Col>

            <Col>
              <FormattedMessage id={'dps.filters.title'} />
            </Col>
          </Row>
        )}
        key={'1'}
      >
        <Form onBlur={() => DpsPostsModel.loadPosts()}>
          <Form.Item
            label={<FormattedMessage id={'dps.filters.scrollCount'} />}
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              max={10}
              size={'large'}
              value={offsetInput}
              width={'100%'}
              onChange={e => DpsPostsModel.changeFilters({
                offset: e && e > 10
                  ? offsetInput
                  : Number(e)
              })}
            />
          </Form.Item>
        </Form>
      </Collapse.Panel>
    </Collapse>
  )
}
