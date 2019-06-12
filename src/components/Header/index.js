import React, { useState } from 'react'
import { createHashHistory } from 'history'
import { Menu, Segment, Icon } from 'semantic-ui-react'
import logo from '@/assets/cnodejs_light.svg'

import './header.scss'

const Header = () => {
  const navList = [
    { name: '全部', value: 'all', path: '/topic?tag=all' },
    { name: '精华', value: 'good', path: '/topic?tag=good' },
    { name: '分享', value: 'share', path: '/topic?tag=share' },
    { name: '问答', value: 'ask', path: '/topic?tag=ask' },
    { name: '招聘', value: 'job', path: '/topic?tag=job' },
    { name: '关于', value: 'about', path: '/about' }
  ]
  const history = new createHashHistory()
  const [ activeItem, setActiveItem ] = useState('all')

  const selectNav = (item) => {
    if (item.value !== activeItem) {
      setActiveItem(item.value)
      history.push(item.path)
    }
  }

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

export default Header
