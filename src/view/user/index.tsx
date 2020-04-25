import React from 'react'
import { useParams, Link } from 'react-router-dom'

import Image from 'components/image'
import sdk from 'service/cnode-sdk'
import isEmpty from 'utils/isEmpty'
import useAysnc from 'hooks/useAsync'
import useInitPosition from 'hooks/useInitPosition'



import { 
  InfoPanel,
  InfoContent,
  ListPanel,
  ListItem,
  SkeletonInfo,
  SkeletonList
} from './style'
import { format } from 'timeago.js'

const Info = React.memo(props => {
  const info = props.value || {}
  return (
    !isEmpty(info) 
      ? <InfoPanel>
        <Image 
          src={info?.avatar_url || ''} 
          width={60} height={60} radius={4} 
        />
        <InfoContent>
          <h3>{ info?.loginname }</h3>
          <ul>
            <li>积分：{ info.score || 0 }</li>
            <li>注册于&nbsp;{ format(info.create_at, 'zh_CN') }</li>
          </ul>
        </InfoContent>
      </InfoPanel>
    : <SkeletonInfo />
  )
})

const List = React.memo(props => {
  const { title, value } = props
  return (
    !isEmpty(value)
      ? <ListPanel>
        <h3>{ title }</h3>
        {
          value.map(link => {
            return (
              <ListItem key={link.id}>
                <Link to={`/article/${link.id}`}>
                  { link.title }
                </Link>
                <span className='create-at'>
                  { format(link.last_reply_at, 'zh_CN') }
                </span>
              </ListItem>
            )
          })
        }
      </ListPanel>
      : <SkeletonList />
  )
})

const User = props => {
  const { name = '' } = useParams()

  let {
    result: info
  } = useAysnc(() => sdk.getUserDetail(name))

  let {
    result: collection 
  } = useAysnc(() => sdk.getUserCollection(name))

  useInitPosition(0, 0)

  info = info.data

  return (
    <section>
      <Info value={info} />
      <List title='最近发布话题' value={info?.recent_topics} />
      <List title='最近回复' value={info?.recent_replies} />
      <List title='收藏话题' value={collection?.data} />
    </section>
  )
}

export default User
