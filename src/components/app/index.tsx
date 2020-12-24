import React from 'react'
import { IntlProvider } from 'react-intl'
import { translates } from 'lib/intl'
import { AppRouter } from '../router'

export const App = () => {
  return (
    <IntlProvider
      locale={'ru'}
      messages={translates.ruRU}
    >
      <AppRouter />
    </IntlProvider>
  )
}
