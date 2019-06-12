import React from 'react'
import { Label } from 'semantic-ui-react'
import TopicLabel from './topicLabel'

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
        <Label as='a' image>
          <img src={data.author.avatar_url} alt={data.author.loginname} />
          {data.author.loginname}
        </Label>
      </div>
    </div>
  )
}

export default TopicCard