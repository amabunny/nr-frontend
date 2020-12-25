import React from 'react'
import { Card } from 'antd'
import { FieldTimeOutlined } from '@ant-design/icons'
import cn from 'classnames'
import { Grid } from '@react-css/grid'
import { FormattedTime } from 'react-intl'
import { IPost } from '@dps-models'
import classes from './style.module.less'

interface IDpsCardProps extends IPost {

}

export const DpsCard = ({ text, replies, author, time }: IDpsCardProps) => {
  return (
    <Card
      size={'small'}
      title={(
        <Grid
          alignItems={'center'}
          columns={'auto 1fr'}
          gridGap={'10px'}
        >
          <FieldTimeOutlined />

          {isNaN(new Date(time || NaN).getTime())
            ? time
            : <FormattedTime value={time} />
          }
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
