import axios from 'axios'

const handleError = (err) => {
  let msg = err.message || err.msg || '请求出错了'
  alert(msg)
}

const handleResponse = (res, resolve) => {
  res = res.data
  if (res.hasOwnProperty('success')) {
    if (res.success) {
      const { success, ...rest } = res
      resolve(rest)
    } else {
      handleError(res)
    }
  } else {
    handleError(res)
  }
}

class SDK {
  constructor() {
    this.$http = axios.create({
      baseURL: 'https://cnodejs.org/api/v1'
    })
  }

  get (url, params) {
    return new Promise((resolve, reject) => {
      this.$http.get(url, { params })
        .then(res => handleResponse(res, resolve))
        .catch(handleError)
    })
  }

  post (url, data) {
    return new Promise((resolve, reject) => {
      this.$http.post(url, data)
        .then(res => handleResponse(res, resolve))
        .catch(handleError)
    })
  }

  /**
   * 获取分类列表
   * @param {String} tab 类型
   * @param {Number} page 页码
   * @param {Number} limit 每页数量
   */
  getTopicsByTab (tab, page = 1, limit = 20) {
    return this.get('/topics', {
      page: parseInt(page),
      limit: parseInt(limit),
      tab
    })
  }
}

export default new SDK()
