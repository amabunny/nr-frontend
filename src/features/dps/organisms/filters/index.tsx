import React from 'react'
import { Row, Col, Collapse, Form, InputNumber, Input } from 'antd'
import { useStore } from 'effector-react'
import { FilterOutlined } from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'
import { DpsPostsModel } from '../../store'

export const Filters = () => {
  const { offset, search } = useStore(DpsPostsModel.$postsFilters)

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
        <Form
          labelCol={{ span: 12 }}
          layout={'horizontal'}
          wrapperCol={{ span: 12 }}
          onBlur={() => DpsPostsModel.loadPosts()}
        >
          <Form.Item
            label={<FormattedMessage id={'dps.filters.scrollCount'} />}
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              max={10}
              size={'large'}
              type={'number'}
              value={offset}
              width={'100%'}
              onChange={e => DpsPostsModel.changeFilters({
                offset: e && e > 10
                  ? offset
                  : Number(e)
              })}
            />
          </Form.Item>

          <Form.Item label={<FormattedMessage id={'dps.filters.search'} />}>
            <Input
              value={search}
              onChange={e => DpsPostsModel.changeFilters({ search: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Collapse.Panel>
    </Collapse>
  )
}
