import React from 'react'
import { useList, useStore } from 'effector-react'
import { Row, Col, Typography, Button, Spin } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { FormattedTime } from 'react-intl'
import { Grid } from '@react-css/grid'
import { Filters } from '../filters'
import { DpsCard } from '../../molecules/dps-card'
import { DpsPostsModel } from '../../store'
import classes from './style.module.less'

export const DpsPosts = () => {
  const lastLoadedTime = useStore(DpsPostsModel.$lastLoadedTime)
  const loading = useStore(DpsPostsModel.$postsLoading)

  return (
    <div className={classes.dpsPosts}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Filters />
        </Col>

        <Col span={24}>
          <Grid
            alignItems={'center'}
            columns={'auto auto'}
            gridGap={'16px'}
            justifyContent={'center'}
          >
            <Typography.Title className={classes.time}>
              <FormattedTime value={lastLoadedTime || undefined} />
            </Typography.Title>

            <Button
              icon={<ReloadOutlined />}
              shape={'circle'}
              size={'large'}
              type={'primary'}
              onClick={() => DpsPostsModel.loadPosts()}
            />
          </Grid>
        </Col>

        {loading && (
          <Col
            span={24}
            style={{ height: 400 }}
          >
            <Grid
              alignItems={'center'}
              justifyContent={'center'}
              style={{ height: '100%' }}
            >
              <Spin size={'large'} />
            </Grid>
          </Col>
        )}

        {useList(DpsPostsModel.$posts, post => (
          <Col span={24}>
            <DpsCard
              author={post.author}
              replies={post.replies}
              text={post.text}
              time={post.time}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}
