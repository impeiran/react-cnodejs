/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import isEmpty from '@/utils/isEmpty'
import ArticleWrapper, { Title } from './style'
import sdk from '@/service/cnode-sdk'
import InfoBar from './info-bar'

import 'github-markdown-css'
import 'code-prettify/styles/sunburst.css'

const Article = () => {
  const { state } = useLocation()
  const { id } = useParams()

  let info = state?.info || {}
  const noCacheInfo = isEmpty(info)

  const contentEl = useRef()

  useEffect(() => {
    window.scrollTo(0, 0)

    !noCacheInfo && Promise.resolve().then(() => window.PR?.prettyPrint())

    sdk.getTopicDetail(id).then(({ data }) => {
      if (noCacheInfo) {
        info = data
        Promise.resolve().then(() => window.PR?.prettyPrint())
      } else {
        info.replies = data.replies
        info.is_collect = data.is_collect
      }
    })
  }, [])

  console.log('render article')
  return (
    <ArticleWrapper>
      <Title>{ info && info.title }</Title>
      <InfoBar value={ info }></InfoBar>
      <div 
        ref={contentEl}
        className='markdown-body' 
        dangerouslySetInnerHTML={{__html: info.content}}
      ></div>
    </ArticleWrapper>
  )
}

export default Article
