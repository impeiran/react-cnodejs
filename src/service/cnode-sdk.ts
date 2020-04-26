import Service, { SuccessFormat } from './base'

class CnodeSDK extends Service {
  constructor () {
    super({
      baseURL: 'https://cnodejs.org/api/v1'
    })
  }

  /**
   * 获取分类列表
   * @param {String} tab 类型
   * @param {Number} page 页码
   * @param {Number} limit 每页数量
   */
  getTopicsByTab (tab: string, page: number = 1, limit: number = 20): Promise<SuccessFormat> {
    return this.get('/topics', {
      page: page,
      limit: limit,
      tab
    })
  }

  /**
   * 获取话题的文章详情
   * @param {String} topicId 
   */
  getTopicDetail (topicId: string | number): Promise<SuccessFormat> {
    return this.get(`/topic/${topicId}`)
  }
  
  /**
   * 获取用户详情页数据
   * @param {String} username 
   */
  getUserDetail (username: string): Promise<SuccessFormat> {
    return this.get(`/user/${username}`)
  }

  /**
   * 获取用户收藏的文章
   * @param {String}} username 
   */
  getUserCollection (username: string): Promise<SuccessFormat> {
    return this.get(`/topic_collect/${username}`)
  }
}

export default new CnodeSDK()
