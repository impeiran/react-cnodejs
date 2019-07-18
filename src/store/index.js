import { createStore } from 'redux'
import utils from '@/utils'

const initState = {
  hasLogin: false,
  openSider: false,

  userInfo: {},
  article: {}
}

const reducer = (state = initState, action) => {
  state = {...state}

  switch (action.type) {
    case 'OPEN_SIDER':
      state.openSider = action.data
      utils.lockScroll(state.openSider)
      break
    
    case 'SET_LOGIN':
      state.hasLogin = action.data
      break

    case 'SET_USER_INFO':
      state.userInfo = action.data
      break

    case 'SET_ARTICLE':
      state.article = action.data
      break

    default:
      return state
  }

  return state
}

export default createStore(reducer)