import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import Header from '@/components/Header'
import Topic from '@/views/topic'
import About from '@/views/about'
import NotFound from '@/views/notFound'

function App() {
  return (
    <div className="App">

      <HashRouter basename='/'>
        <Header />

        <main>
          <Switch>
            <Redirect from={'/'} to={'/topic?tab=all'} exact push></Redirect>
            <Route path={'/topic'} exact component={Topic}></Route>
            <Route path={'/about'} exact component={About}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </main>
        
      </HashRouter>

    </div>
  );
}

export default App;
