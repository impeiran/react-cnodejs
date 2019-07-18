import React from 'react'
import { withRouter } from 'react-router-dom'
import { useMappedState } from 'redux-react-hook'
import { useDispatch } from 'redux-react-hook'

import cacheHelper from '@/utils/cacheHelper'

import { Sidebar, Icon } from 'semantic-ui-react'
import { Modal, Toast } from 'antd-mobile'

import './sideBar.scss'

const SideBarContent = props => {

  const { history } = props

  const siderVisable = useMappedState(state => state.openSider)
  const userInfo = useMappedState(state => state.userInfo)
  const dispatch = useDispatch()

  const closeSider = () => {
    dispatch({ type: 'OPEN_SIDER', data: false })
  }

  const goUserCenter = () => {
    history.push(`/user/${userInfo.loginname}`)
    closeSider()
  }

  const clearCache = () => {
    Modal.alert('确定是否清除', '列表缓存、用户TOKEN等...',  [
      { text: '取消' },
      {
        text: '确定',
        onPress: value => {
          new cacheHelper().clear()
          Toast.success('清除成功', 1)
        }
      },
    ])
  }

  const logout = () => {
    Modal.alert('是否要退出登录', '',  [
      { text: '取消' },
      {
        text: '确定',
        onPress: value => {
          closeSider()
          dispatch({ type: 'SET_USER_INFO', data: {} })
          dispatch({ type: 'SET_LOGIN', data: false })
        }
      },
    ])
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
        <div className="content-head">
          <div className="user-avatar" onClick={goUserCenter}>
            <img src={userInfo.avatar_url} alt="avatar"></img>
          </div>

          <h4 onClick={goUserCenter}>{ userInfo.loginname }</h4>
        </div>

        <div className="content-body">
          <ul className="list">
            <li onClick={goUserCenter}><Icon name="star"/>个人主页</li>
            <li onClick={clearCache}><Icon name="setting"/>清除缓存</li>
          </ul>

          <div className="logout" onClick={logout}>退出登录</div>
        </div>
        
      </Sidebar>

      { 
        siderVisable
        ? <div className="mask" onClick={closeSider}></div>
        : null
      }
    </div>
  )
}

export default withRouter(SideBarContent)