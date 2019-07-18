import axios from 'axios'
import { Toast } from 'antd-mobile'

class SDK {
  constructor () {
    this.apiPrefix = 'https://cnodejs.org/api/v1'

    this.axios = axios.create()

    this.axios.interceptors.response.use(res => {
      return res
    }, err => {
      console.log(err)
      Toast.fail('请求失败，请重新刷新页面', 3)
      return Promise.reject(err)
    })
  }

  get (url, query) {
    return this.axios.get(this.apiPrefix + url, {
      params: query
    })
  }

  post (url, data) {
    return this.axios.post(this.apiPrefix + url, data)
  }

  // 登录 校验token
  login (token = '') {
    return this.post('/accesstoken', {
      accesstoken: token
    })
  }

  // 获取话题列表
  getTopicsByTab (tab, page = 1, limit = 20) {
    return this.get('/topics', {
      page: parseInt(page),
      limit: parseInt(limit),
      tab
    })
  }

  // 获取话题详情（文章）
  getTopicDetail (topicId, token) {
    const query = token ? { accesstoken: token } : {}
    return this.get('/topic/' + topicId, query)
  }

  // 用户详情
  getUserDetail (loginname) {
    return this.get('/user/' + loginname)
  }
}

export default new SDK()