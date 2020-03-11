import React from 'react'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import { format } from 'timeago.js'
import ContentLoader from 'react-content-loader'
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

const Skeleton = React.memo(option => {
  return <ContentLoader backgroundColor={'#dadada'} style={{ width: '100%', height: '105px' }} {...option}>
  <rect rx="4" ry="4" width="44" height="25"></rect>
  <rect x="55" y="2.5" width="100%" height="20" ></rect>
  <rect y="35" rx="4" ry="4" width="44" height="44"></rect>
  <rect x="55" y="37" width="80" height="15"></rect>
  <rect x="55" y="58" width="80" height="15"></rect>
  <rect x="0" y="92" width="100%" height="1"></rect>
  </ContentLoader>
})

export const createSkeleton = (num = 1, option = {}) => {
  return Array.from({ length: num }, (v, i) => {
    return <Skeleton option={option} key={i} />
  })
}

export default React.memo(Card)
