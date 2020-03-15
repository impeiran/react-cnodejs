import React from 'react'
import styled from "styled-components"
import { COLOR_THEME } from '@/style/constants'
import ContentLoader from 'react-content-loader'

const InfoPanel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const InfoContent = styled.div`
  margin: 0 10px;

  h3 {
    line-height: 20px;
    font-size: 16px;
  }

  li {
    line-height: 20px;
    color: #aaa;
  }
`

const ListPanel = styled.div`
  margin-bottom: 10px;

  h3 {
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
  }
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  line-height: 20px;

  a {
    display: inline-block;
    flex: 1;
    color: ${COLOR_THEME};
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .create-at {
    display: inline-block;
    color: #aaa;
  }
`

const SkeletonInfo = () => {
  return (
    <ContentLoader backgroundColor={'#dadada'} style={{ width: '100%', height: '80px' }}>
      <rect rx="4" ry="4" width="60" height="60"></rect>
      <rect x="70" y="4" width="80" height="14"></rect>
      <rect x="70" y="22" width="50" height="14"></rect>
      <rect x="70" y="40" width="50" height="14"></rect>
    </ContentLoader>
  )
}

const SkeletonList = () => {
  return (
    <ContentLoader backgroundColor={'#dadada'} style={{ width: '100%', height: '110px' }}>
      <rect width="100" height="20"></rect>
      <rect y="30" width="100%" height="1"></rect>
      <rect y="40" width="95%" height="14"></rect>
      <rect y="60" width="65%" height="14"></rect>
      <rect y="80" width="80%" height="14"></rect>
    </ContentLoader>
  )
}

export {
  InfoPanel,
  InfoContent,
  ListPanel,
  ListItem,
  SkeletonInfo,
  SkeletonList
}