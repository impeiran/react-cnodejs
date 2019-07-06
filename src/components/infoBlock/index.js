import React from 'react'
import { withRouter } from 'react-router-dom'
import { format } from 'timeago.js'

import './infoBlock.scss'

const InfoBlock = props => {
  const { headline, list, history } = props

  const checkTopic = topicId => {
    history.push('/article/' + topicId)
  }

  return (
    <div className="info-block">
      <h4>{headline}</h4>
      <ul>
      {
        list.map(item => {
          const { id, title, last_reply_at } = item
          return (
            <li key={id} onClick={e => checkTopic(id)}>
              <div className="title">{ title }</div>
              <div className="time">{ format(last_reply_at, 'zh_CN') }</div>   
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default withRouter(InfoBlock)