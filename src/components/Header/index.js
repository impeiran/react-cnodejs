import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useMappedState } from 'redux-react-hook'

import cnodeSDK from '@/utils/cnodeSDK'
import Utils from '@/utils/index.js'
import cacheHelper from '@/utils/cacheHelper'

import { Modal, Toast } from 'antd-mobile'
import { Menu, Segment, Icon } from 'semantic-ui-react'

import logo from '@/assets/cnodejs_light.svg'
import './header.scss'

const TOKEN_STORE_KEY = 'user_token'
const TOKEN_STORE_EXPIRE = 3 * 24 * 60 * 60 * 1000
const tokenCacheHelper = new cacheHelper({ expire: TOKEN_STORE_EXPIRE })

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

  // 点击user图标，触发登录判断
  // 未登录 -> 弹框提示登录
  // 已登录 -> 显示面板
  const loginStatus = useMappedState(state => state.hasLogin)
  const iconStyle = loginStatus
    ? { color: 'rgb(128, 189, 1)' }
    : { color: '#ddd' }
  const checkIn = e => {
    if (!loginStatus) {
      const hisToken = tokenCacheHelper.get(TOKEN_STORE_KEY) || ''
      const prompt = Modal.prompt('请进行登录', '测试账号：',  [
        { text: '取消' },
        {
          text: '登录',
          onPress: value => {
            value = value.trim()
            cnodeSDK.login(value).then(res => {
              res = res.data
              if (res.success) {
                delete res.success
                dispatch({ type: 'SET_LOGIN', data: true })
                dispatch({ type: 'SET_USER_INFO', data: {...res, token: value} })
                tokenCacheHelper.set(TOKEN_STORE_KEY, value)
                Toast.success('登录成功！', 1)
              }
              prompt.close()
            })
          }
        },
      ], 'default', hisToken, ['access_token'])
    } else {
      dispatch({ type: 'OPEN_SIDER', data: true })
    }
  }

  // 导航路由切换逻辑
  const { history, location } = props
  const [ activeItem, setActiveItem ] = useState(initRouteValue(location))
  const dispatch = useDispatch()

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
        <Icon name="user" className="icon-user" style={ iconStyle } onClick={ checkIn }></Icon>
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
