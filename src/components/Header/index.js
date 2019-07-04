import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Utils from '@/utils/index.js'
import { Menu, Segment, Icon } from 'semantic-ui-react'

import logo from '@/assets/cnodejs_light.svg'
import './header.scss'


const Header = (props) => {
  const navList = [
    { name: '全部', value: 'all', path: '/topic?tab=all' },
    { name: '精华', value: 'good', path: '/topic?tab=good' },
    { name: '分享', value: 'share', path: '/topic?tab=share' },
    { name: '问答', value: 'ask', path: '/topic?tab=ask' },
    { name: '招聘', value: 'job', path: '/topic?tab=job' },
    { name: '关于', value: 'about', path: '/about' }
  ]

  const initRouteValue = (loc) => {
    if (loc.pathname === '/') {
      return navList[0].value
    } else if (loc.pathname === '/topic') {
      const query = Utils.searchToQuery(loc.search)
      return query['tab']
    } else {
      for (let i = navList.length - 1 ; i > -1 ; i--) {
        if (navList[i].path === loc.pathname) {
          return navList[i].value
        }
      }
    }
    return ''
  }

  const { history, location } = props
  const [ activeItem, setActiveItem ] = useState(initRouteValue(location))

  const selectNav = (item) => {
    item.value !== activeItem && history.push(item.path)
  }

  history.listen((location) => {
    setActiveItem(initRouteValue(location))
  })

  return (
    <header>
      <div className="header-top">
        <img src={logo} alt="logo"/>
        <Icon name="user" className="icon-user"></Icon>
      </div>

      <Segment inverted>
        <Menu inverted pointing secondary>
        {
          navList.map((item, index) => {
            return (
              <Menu.Item 
                name={item.name}
                active={item.value === activeItem}
                key={index}
                onClick={() => selectNav(item)}
              />
            )
          })
        }
        </Menu>
      </Segment>
    </header>
  ) 
}

export default withRouter(Header)
