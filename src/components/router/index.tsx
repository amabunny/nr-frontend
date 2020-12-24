import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RouterService } from 'services'
import { DpsPage } from 'pages/dps'

export const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path={RouterService.getIndexPage()}>
        <DpsPage />
      </Route>
    </Switch>
  </BrowserRouter>
)
