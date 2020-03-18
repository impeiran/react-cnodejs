/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import InfoBar from './info-bar'
import CommentPanel, { SkeletonComment } from './comment-panel'
import ArticleWrapper, { Title, SkeletonMain } from './style'
import sdk from '@/service/cnode-sdk'
import isEmpty from '@/utils/isEmpty'

import 'github-markdown-css'
import 'code-prettify/styles/sunburst.css'

const Article = () => {
  const { state } = useLocation()
  const { id } = useParams()

  const [info, setInfo] = useState(state || {})

  const noCacheInfo = useMemo(() => isEmpty(info), [info])

  const contentEl = useRef()

  useEffect(() => {
    window.scrollTo(0, 0)

    !noCacheInfo && Promise.resolve().then(() => window.PR?.prettyPrint())

    sdk.getTopicDetail(id).then(({ data }) => {
      if (noCacheInfo) {
        setInfo(data)
        Promise.resolve().then(() => window.PR?.prettyPrint())
      } else {
        setInfo(info => {
          return {
            ...info,
            replies: data.replies,
            is_collect: data.is_collect
          }
        })
      }
    })
  }, [])

  return (
    <ArticleWrapper>
      {
        info.hasOwnProperty('content')
          ? <>
            <Title>{ info && info.title }</Title>
            <InfoBar value={ info }></InfoBar>
            <div 
              ref={contentEl}
              className='markdown-body' 
              dangerouslySetInnerHTML={{__html: info.content}}
            ></div>
          </>
          : <SkeletonMain />
      }
      {
        info.hasOwnProperty('replies')
          ? <CommentPanel value={info.replies} articleAuthor={info.author?.loginname} />
          : <SkeletonComment />
      }
    </ArticleWrapper>
  )
}

export default Article
