import React from 'react'
import { Card } from 'antd'
import { FieldTimeOutlined } from '@ant-design/icons'
import cn from 'classnames'
import { Grid } from '@react-css/grid'
import { INormalizedPost } from '../../store'
import classes from './style.module.less'

interface IDpsCardProps extends INormalizedPost {

}

export const DpsCard = ({ text, replies, author, time }: IDpsCardProps) => {
  return (
    <Card
      className={classes.card}
      size={'small'}
      title={(
        <Grid
          alignItems={'center'}
          columns={'auto 1fr'}
          gridGap={'10px'}
        >
          <FieldTimeOutlined />

          {time}
        </Grid>
      )}
    >
      <span
        className={cn(
          classes.text, {
            [classes.textMb]: replies?.length !== 0
          }
        )}
      >
        {text}
      </span>

      {replies && (
        <div className={classes.replies}>
          {replies.map((reply, index) => (
            <div key={`${author}-${reply.author}-${reply.time}-${index}`}>
              - {reply.text}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
