import React from 'react'
import { NavLink } from 'react-router-dom'
import TabbarWrapper, { TabbarItem } from './style'

const Tabbar = props => {
  return (
    <TabbarWrapper>
      {
        props.value.map(item => {
          return (
            <NavLink key={item.name} to={item.route} activeClassName={'active'}>
              <TabbarItem>{ item.name || '' }</TabbarItem>
            </NavLink>
          )
        })
      }
    </TabbarWrapper>
  )
}

Tabbar.defaultProps = {
  value: []
}

export default React.memo(Tabbar)
