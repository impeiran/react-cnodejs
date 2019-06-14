import axios from 'axios'

class SDK {
  constructor () {
    this.axios = axios
    this.apiPrefix = 'https://cnodejs.org/api/v1'
  }

  get (url, query) {
    return this.axios.get(this.apiPrefix + url, {
      params: query
    })
  }

  post (url, data) {
    return this.axios.post(this.apiPrefix + url, data)
  }

  getTopicsByTab (tab, page = 1, limit = 20) {
    return this.get('/topics', {
      page: parseInt(page),
      limit: parseInt(limit),
      tab
    })
  }

  getTopicDetail (topicId, token) {
    const query = token ? { accesstoken: token } : {}
    return this.get('/topic/' + topicId, query)
  }
}

export default new SDK()