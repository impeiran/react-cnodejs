import React, { useState, useEffect } from 'react'
import Avatar from '@/components/avatar'
import { withRouter, Link } from 'react-router-dom'
import { format } from 'timeago.js'
import codePrettify from 'code-prettify'

import cnodeSDK from '@/utils/cnodeSDK.js'

import './article.scss'

const Article = props => {
  const { match } = props
  const { id } = match.params

  const [info, setInfo] = useState({})
  
  useEffect(() => {
    window.scrollTo(0, 0)
    cnodeSDK.getTopicDetail(id).then(res => {
      setInfo(res.data.data)
      codePrettify.prettyPrint()
    })
  }, [id])

  return (
    Object.keys(info).length
    ? <section className="article-page">
        <h1>{ info.title }</h1>
        <div className="article-head">
          <Avatar
            target={info.author.loginname}
            size={28}
            src={info.author.avatar_url}
          />
          <ul className="sub-bar">
            <li>{info.author.loginname}</li>
            <li>发布于{ format(info.create_at, 'zh_CN')  }</li>
            <li>{ info.visit_count }次浏览</li>
          </ul>
        </div>

        <div className="markdown-body article-body" dangerouslySetInnerHTML={{__html: info.content}}></div>

        { 
          info.replies.length
          ? <h4>共{info.replies.length}条评论：</h4>
          : <div className="reply-item empty">
              暂无评论
            </div>
        }

        {
          info.replies.map( (item, index) => {
            return (
              <div
                className="reply-item"
                key={item.id}
              >
                <div className="reply-item-head">
                  <Avatar
                    target={item.author.loginname}
                    size={30}
                    src={item.author.avatar_url}
                  />
                  <ul className="reply-item-info">
                    <li>
                      <Link to={'/user/' + item.author.loginname}>
                        { item.author.loginname }
                        { item.author.loginname === info.author.loginname ? ' (作者)' : '' }
                      </Link>
                    </li>
                    <li>
                      {index + 1}楼
                      &nbsp;&nbsp;&nbsp;
                      {format(info.create_at, 'zh_CN')}
                    </li>
                  </ul>
                </div>

                <div className="markdown-body reply-item-body" dangerouslySetInnerHTML={{__html: item.content}}></div>
              </div>
            )
          })
        }
      </section>
    : null
  )
}

export default withRouter(Article)

// index.js:1375 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
//     in Article (created by Context.Consumer)
//     in withRouter(Article) (created by Context.Consumer)