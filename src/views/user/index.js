import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { format } from 'timeago.js'
import { Loader } from 'semantic-ui-react'
import InfoBlock from '@/components/infoBlock'

import cnodeSDK from '@/utils/cnodeSDK'

import './user.scss'

const UserPage = props => {
  const { loginname } = props.match.params

  const [initCollect, setInitCollect] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [collectList, setCollectList] = useState([])

  useEffect(() => {
    cnodeSDK.getUserDetail(loginname).then(res => {
      res = res.data
      if (!res.success) return
      setUserInfo(res.data)
    })

    cnodeSDK.getTopicCollect(loginname).then(res => {
      res = res.data
      if (!res.success) return
      setCollectList(res.data)
      setInitCollect(true)
    })
  }, [loginname])

  const initUserInfo = !!Object.keys(userInfo).length

  return (
    Object.keys(userInfo).length
    ? <section className="user-page">
        <div className="base-info">
          <img src={userInfo.avatar_url} alt="avatar" />
          <ul className="info-list">
            <li>{userInfo.loginname}</li>
            <li>积分：{userInfo.score}</li>
            <li>注册于{format(userInfo.create_at, 'zh_CN')}</li>
          </ul>
        </div>

        {
          [
            { headline: '最近发布话题', list: userInfo.recent_topics },
            { headline: '最近回复', list: userInfo.recent_replies }
          ].map((item, index) => (
            <InfoBlock key={index} {...item} />
          ))
        }

        {
          initCollect
          ? <InfoBlock headline="收藏话题" list={collectList} />
          : null
        }

        {
          initUserInfo && initCollect
          ? null
          : <Loader active inline='centered' size="medium">玩命加载中</Loader>
        }
      </section>
    : null
  )
}

export default withRouter(UserPage)