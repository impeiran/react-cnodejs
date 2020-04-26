import React from 'react'
import { BaseLayout } from './layouts'
import { GlobalStyle } from './style/global'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const basename: string = process.env.NODE_ENV === 'production'
  ? '/cnode'
  : '/'

const App: React.FC = (props) => {
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <GlobalStyle />

        <Switch>
          <Route path={'/'} component={BaseLayout} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}


export default App;
