import React from 'react'
import { useHistory } from 'react-router-dom'
import InfoBarWrapper from './style'
import Image from 'components/image'
import { format } from 'timeago.js'

import { 
  Article as ArticleType
} from 'types'

interface IProps {
  value: ArticleType
}

const InfoBar: React.FC<IProps> = (props: IProps) => {
  const history = useHistory()

  const {
    author,
    visit_count,
    create_at
  } = (props.value || {})

  const visitUser = (e: React.MouseEvent, name: string) => {
    e.stopPropagation()
    history.push(`/user/${name}`)
  }

  return (
    <InfoBarWrapper>
      <Image 
        src={ author?.avatar_url || '' } 
        width={28} height={28} radius={4}
        onClick={e => visitUser(e, author.loginname)}
      />
      <ul>
        <li>{ author?.loginname }</li>
        <li>{ format(create_at, 'zh_CN') }</li>
        <li>{ visit_count }次浏览</li>
      </ul>
    </InfoBarWrapper>
  )
}


export default React.memo(InfoBar)