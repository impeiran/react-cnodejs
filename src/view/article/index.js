/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useAsync from '@/hooks/useAsync'
import InfoBar from './info-bar'
import CommentPanel, { SkeletonComment } from './comment-panel'
import ArticleWrapper, { Title, SkeletonMain } from './style'
import sdk from '@/service/cnode-sdk'
import isEmpty from '@/utils/isEmpty'

import 'github-markdown-css'
import 'code-prettify/styles/sunburst.css'

const Article = () => {
  const { id } = useParams()

  let info = useLocation().state || {}

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { loading, result } = useAsync(() => sdk.getTopicDetail(id))
  
  info = isEmpty(result) ? info : result.data
  Promise.resolve().then(() => window.PR?.prettyPrint())

  return (
    <ArticleWrapper>
      {
        info.hasOwnProperty('content')
          ? <>
            <Title>{ info && info.title }</Title>
            <InfoBar value={ info }></InfoBar>
            <div 
              className='markdown-body' 
              dangerouslySetInnerHTML={{__html: info.content}}
            ></div>
          </>
          : <SkeletonMain />
      }
      {
        !loading
          ? <CommentPanel value={result.data?.replies} articleAuthor={result.data?.author?.loginname} />
          : <SkeletonComment />
      }
    </ArticleWrapper>
  )
}

export default Article
