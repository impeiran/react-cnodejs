import React from 'react'
import { useMappedState } from 'redux-react-hook'
import { useDispatch } from 'redux-react-hook'

import { Sidebar } from 'semantic-ui-react'

import './sideBar.scss'

const SideBarContent = props => {

  const siderVisable = useMappedState(state => state.openSider)
  const dispatch = useDispatch()

  const clickMask = e => {
    dispatch({
      type: 'OPEN_SIDER',
      data: false
    })
  }

  return (
    <div>
      <Sidebar
        className="side-bar"
        animation="overlay"
        direction="right"
        width="thin"
        visible={siderVisable}
      >
        hello sideBar
      </Sidebar>

      { 
        siderVisable
        ? <div className="mask" onClick={clickMask}></div>
        : null
      }
    </div>
  )
}

export default SideBarContent