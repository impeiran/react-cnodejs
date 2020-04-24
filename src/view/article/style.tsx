import React from 'react'
import styled from "styled-components"
import ContentLoader from 'react-content-loader'

const ArticleWrapper = styled.article`

`

export const Title = styled.h2`
  margin-bottom: 6px;
  line-height: 1.2;
  font-size: 22px;
`

export const SkeletonMain = () => {
  return (
    <ContentLoader backgroundColor={'#dadada'} style={{ width: '100%', height: '370px' }}>
      <rect width="95%" height="25"></rect>
      <rect y="32" rx="4" ry="4" width="28" height="28"></rect>
      <rect x="36" y="34" width="60%" height="20"></rect>
      <rect y="100" height="18" width="40%"></rect>
      <rect y="130" height="18" width="90%"></rect>
      <rect y="160" height="18" width="75%"></rect>
      <rect y="190" height="18" width="100%"></rect>
      <rect y="250" height="18" width="100%"></rect>
      <rect y="280" height="18" width="80%"></rect>
      <rect y="310" height="18" width="90%"></rect>
      <rect y="340" height="18" width="60%"></rect>
    </ContentLoader>
  )
}

export default ArticleWrapper