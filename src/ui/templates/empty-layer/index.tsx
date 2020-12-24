import React from 'react'
import classes from './style.module.less'
import { Typography } from 'antd'

interface IEmptyLayerTemplateProps {
  children?: React.ReactNode
  title?: React.ReactNode
}

export const EmptyLayerTemplate = ({ children, title }: IEmptyLayerTemplateProps) => {
  return (
    <div className={classes.emptyLayerTemplate}>
      {title && (
        <Typography.Title
          className={classes.title}
          level={3}
        >
          {title}
        </Typography.Title>
      )}

      {children}
    </div>
  )
}
