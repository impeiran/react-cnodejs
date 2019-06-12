import React from 'react'
import TopicLabel from './topicLabel'
import { format } from 'timeago.js'

import './topicCard.scss'

const TopicCard = (props) => {
  const { data } = props

  const filteLabel = item => {
    return {
      good: item.good,
      tab: item.tab,
      top: item.top
    }
  }

  return (
    <div className="topic-card-item">
      <div className="card-head">
        <TopicLabel info={filteLabel(data)} />
        <h4>{data.title}</h4>
      </div>

      <div className="card-body">
        <div className="avatar-box">
          <img src={data.author.avatar_url} alt="avatar"/>
        </div>

        <ul className="number-box">
          <li>查看数：{data.visit_count}</li>
          <li>回复数：{data.reply_count}</li>
        </ul>

        <div className="time-from"
        >{ format(data.last_reply_at, 'zh_CN') }</div>
      </div>
    </div>
  )
}

export default TopicCard