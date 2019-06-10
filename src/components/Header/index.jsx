import React, { useState } from 'react'
import { Menu, Segment, Icon } from 'semantic-ui-react'
import logo from '@/assets/cnodejs_light.svg'

import './header.scss'

const Header = () => {
  const navList = [
    { name: '全部', value: 'all' },
    { name: '精华', value: 'good' },
    { name: '分享', value: 'share' },
    { name: '问答', value: 'ask' },
    { name: '招聘', value: 'job' },
    { name: '关于', value: 'about' }
  ]

  const [ activeItem, setActiveItem ] = useState('all')

  const selectNav = (index) => {
    setActiveItem(navList[index].value)
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
                  onClick={() => selectNav(index)}
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
