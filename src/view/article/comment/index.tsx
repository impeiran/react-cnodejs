import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Comment, CommentHeader, CommentInfoBar } from './style'
import Image from '@/components/image'
import { format } from 'timeago.js'

export default props => {
  const { value = {}, num, articleAuthor = '' } = props
  const history = useHistory()

  const visitUser = (e, name) => {
    e.stopPropagation()
    history.push(`/user/${name}`)
  }

  return (
    <Comment>
    {
      props.children || <>
        <CommentHeader>
          <Image 
            src={value.author?.avatar_url || ''} 
            width={30} height={30} radius={4} 
            onClick={e => visitUser(e, value.author?.loginname)}
          />
          <CommentInfoBar>
            <Link to={`/user/${value.author?.loginname}`}>
              <h3>
                { value.author?.loginname }
                { articleAuthor === value.author?.loginname ? '(楼主)' : '' }
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
      </>
    }
      
    </Comment>
  )
}
