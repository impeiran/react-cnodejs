import React from 'react'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom'

import store from '@/store'

import Header from '@/components/Header'
import SideBarContent from '@/components/sideBarContent'
import Topic from '@/views/topic'
import About from '@/views/about'
import Article from '@/views/article'
import User from '@/views/user'
import Setting from '@/views/setting'
import NotFound from '@/views/notFound'

import { Sidebar } from 'semantic-ui-react'

const App = props => {
  return (
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <Sidebar.Pushable>
          <Sidebar.Pusher>
          
            <Header />

            <main>
              <Switch>
                <Redirect from={'/'} to={'/topic?tab=all'} exact></Redirect>
                <Route path={'/topic'} component={Topic}></Route>
                <Route path={'/about'} component={About}></Route>
                <Route path={'/article/:id'} component={Article}></Route>
                <Route path={'/user/:loginname'} component={User}></Route>
                <Route path={'/setting'} component={Setting}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </main>

            <SideBarContent />

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </BrowserRouter>
    </StoreContext.Provider>
  );
}

export default App;
