import React from 'react'
import Header from '@/components/Header'
import Tabbar from '@/components/Tabbar'
import Topic from '@/view/Topic'
import NotFound from '@/view/NotFound'
import About from '@/view/About'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout, { Fixed, Main } from './style'

const navList = [
  { name: '全部', route: '/topic/all' },
  { name: '精华', route: '/topic/good' },
  { name: '分享', route: '/topic/share' },
  { name: '问答', route: '/topic/ask' },
  { name: '招聘', route: '/topic/job' },
  { name: '关于', route: '/about' },
]

const BaseLayout = props => {
  return (
    <Layout>
      <Fixed>
        <Header logo={require('@/assets/logo.svg')} />
        <Tabbar value={navList} />
      </Fixed>

      <Main>
        <Switch>
          <Redirect from={'/'} to={'/topic/all'} exact />
          <Route path={'/topic/:tag'} component={Topic} exact />
          <Route path={'/about'} component={About} exact />
          <Route path={'*'} component={NotFound} />
        </Switch>
      </Main>
    </Layout>
  )
}

export default React.memo(BaseLayout)
