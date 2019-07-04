import React from 'react'
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom'

import Header from '@/components/Header'
import Topic from '@/views/topic'
import About from '@/views/about'
import Article from '@/views/article'
import NotFound from '@/views/notFound'

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />

        <main>
          <Switch>
            <Redirect from={'/'} to={'/topic?tab=all'} exact></Redirect>
            <Route path={'/topic'} component={Topic}></Route>
            <Route path={'/about'} component={About}></Route>
            <Route path={'/article'} component={Article}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </main>
        
      </BrowserRouter >

    </div>
  );
}

export default App;
