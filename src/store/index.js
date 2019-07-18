import { createStore } from 'redux';

const BODY = document.body || document.getElementsByTagName('body')[0]

const bodyStopScroll = (e) => {
  e.stopPropagation()
  e.preventDefault()
}

const lockScroll = flag => {
  if (flag) {
    BODY.style.overflow = 'hidden'
    document.addEventListener('touchmove', bodyStopScroll, { passive: false })
  } else {
    BODY.style.overflow = 'visible'
    document.removeEventListener('touchmove', bodyStopScroll, { passive: false })
  }
}

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
      lockScroll(state.openSider)
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