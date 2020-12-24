import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Emoji } from 'emoji-mart'
import { DpsPosts, DpsPostsModel } from 'features/dps'
import { EmptyLayerTemplate } from 'ui'

export const DpsPage = () => {
  React.useEffect(() => {
    DpsPostsModel.init()
  }, [])

  return (
    <EmptyLayerTemplate
      title={(
        <FormattedMessage
          id={'dps.title'}
          values={{
            icon: (
              <Emoji
                emoji={':rotating_light:'}
                set={'apple'}
                size={24}
              />
            )
          }}
        />
      )}
    >
      <DpsPosts />
    </EmptyLayerTemplate>
  )
}
