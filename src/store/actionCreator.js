import {
  OPEN_SIDER,
  SET_LOGIN,
  SET_USER_INFO,
  SET_ARTICLE
} from './actionTypes'

const setLogin = status => ({
  type: SET_LOGIN,
  data: status
})

const openSider = status => ({
  type: OPEN_SIDER,
  data: status
})

const setUserInfo = info => ({
  type: SET_USER_INFO,
  data: info
})

const setArticle = article => ({
  type: SET_ARTICLE,
  data: article
})

export default {
  setLogin,
  openSider,
  setUserInfo,
  setArticle
}