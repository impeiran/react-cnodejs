import React from 'react'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import { format } from 'timeago.js'
import CardWrapper, { CardHead, CardBody, Info, Time } from './style'

const Card = props => {
  const { data } = props

  const genTagType = () => {
    if (data.top) return 'top'
    if (data.good) return 'good'

    return data.tab
  }

  return (
    <CardWrapper>
      <CardHead>
        <Tag type={genTagType()}></Tag>
        <h4>{ data.title }</h4>
      </CardHead>

      <CardBody>
        <Image src={ data.author.avatar_url || '' } width={44} height={44} radius={4} />
        <Info>
          <ul>
            <li>查看数：{data.visit_count}</li>
            <li>回复数：{data.reply_count}</li>
          </ul>
          <Time>{ format(data.last_reply_at, 'zh_CN') }</Time>
        </Info>
      </CardBody>
    </CardWrapper>
  )
}

export default React.memo(Card)
