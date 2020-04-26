import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Comment as CommentWrapper, CommentHeader, CommentInfoBar } from './style'
import Image from 'components/image'
import { format } from 'timeago.js'

import { Comment as CommentType } from 'types'

interface IProps {
  value?: CommentType;
  num?: number;
  articleAuthor?: string;
  children?: React.ReactElement;
}

const Comment: React.FC<IProps> = (props: IProps) => {
  const { value, num, articleAuthor = '' } = props
  const history = useHistory()

  const visitUser = (e: React.MouseEvent, name: string) => {
    e.stopPropagation()
    history.push(`/user/${name}`)
  }

  return (
    <CommentWrapper>
    {
      props.children || (value && <>
        <CommentHeader>
          <Image 
            src={value.author.avatar_url || ''} 
            width={30} height={30} radius={4} 
            onClick={e => visitUser(e, value.author.loginname)}
          />
          <CommentInfoBar>
            <Link to={`/user/${value.author.loginname}`}>
              <h3>
                { value.author.loginname }
                { articleAuthor === value.author.loginname ? '(楼主)' : '' }
              </h3>
            </Link>
            <ul>
              <li>{ num }楼</li>
              <li>{ format(value.create_at, 'zh_CN') }</li>
            </ul>
          </CommentInfoBar>
          <div className="corner-icon">
            <span role="img" aria-label="like">👍</span>
            <span>{ value.ups?.length || 0}</span>
          </div>
        </CommentHeader>
        <main className="markdown-body" dangerouslySetInnerHTML={{ __html: value.content }}></main>
      </>)
    }
      
    </CommentWrapper>
  )
}

export default Comment
