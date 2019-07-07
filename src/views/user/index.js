import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { format } from 'timeago.js'
import { Loader } from 'semantic-ui-react'
import InfoBlock from '@/components/infoBlock'

import cnodeSDK from '@/utils/cnodeSDK'

import './user.scss'

const UserPage = props => {
  const { loginname } = props.match.params
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    cnodeSDK.getUserDetail(loginname).then(res => {
      res = res.data
      if (!res.success) return

      const data = res.data
      setUserInfo(data)
    })
  }, [loginname])

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
      </section>
      : <Loader active inline='centered' size="medium">玩命加载中</Loader>
    
  )
}

export default withRouter(UserPage)