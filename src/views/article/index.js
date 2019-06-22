import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
// import { createHashHistory } from 'history'
import { format } from 'timeago.js'
import codePrettify from 'code-prettify'

import Utils from '@/utils'
import cnodeSDK from '@/utils/cnodeSDK.js'

import './article.scss'

const Article = props => {

  const { location } = props
  const { id } = Utils.searchToQuery(location.search)

  const [info, setInfo] = useState({})
  
  useEffect(() => {
    window.scrollTo(0, 0)
    cnodeSDK.getTopicDetail(id).then(res => {
      setInfo(res.data.data)
      codePrettify.prettyPrint()
      console.log(res.data.data)
    })
  }, [id])

  return (
    Object.keys(info).length ? <section className="article-page">
      <h1>{ info.title }</h1>
      <div className="article-head">
        <ul className="sub-bar">
          <li>{info.author.loginname}</li>
          <li>发布于{ format(info.create_at, 'zh_CN')  }</li>
          <li>{ info.visit_count }次浏览</li>
        </ul>
      </div>

      <div className="markdown-body article-body" dangerouslySetInnerHTML={{__html: info.content}}></div>

      { info.replies.length ? <h4>共{info.replies.length}条评论：</h4> : null }

      {
        info.replies.map( (item, index) => {
          return (
            <div
              className="reply-item"
              key={item.id}
            >
              <div className="reply-item-head">
                <img className="avatar" src={item.author.avatar_url} />
                <ul className="reply-item-info">
                  <li>
                    { item.author.loginname }
                    { item.author.loginname === info.author.loginname ? ' (作者)' : '' }
                  </li>
                  <li>
                    {index + 1}楼
                    &nbsp;&nbsp;&nbsp;
                    {format(info.create_at, 'zh_CN')}</li>
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