import React from 'react'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom'

import store from '@/store'

import Header from '@/components/Header'
import Topic from '@/views/topic'
import About from '@/views/about'
import Article from '@/views/article'
import User from '@/views/user'
import NotFound from '@/views/notFound'

function App() {
  return (
    <StoreContext.Provider value={store}>
      <div className="App">
        <BrowserRouter>
          <Header />

          <main>
            <Switch>
              <Redirect from={'/'} to={'/topic?tab=all'} exact></Redirect>
              <Route path={'/topic'} component={Topic}></Route>
              <Route path={'/about'} component={About}></Route>
              <Route path={'/article/:id'} component={Article}></Route>
              <Route path={'/user/:loginname'} component={User}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </main>
          
        </BrowserRouter>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
