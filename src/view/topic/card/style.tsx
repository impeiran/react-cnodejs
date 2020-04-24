import React from 'react'
import styled from 'styled-components'
import ContentLoader from 'react-content-loader'

const CardWrapper = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
`

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  h4 {
    margin-left: 10px;
    flex: 1;
    line-height: 1.4;
    font-size: 14px;
  }
`

export const CardBody = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`

export const Info = styled.div`
  display: flex;
  flex: 1;

  ul {
    margin-left: 10px;
    flex: 1;

    li {
      margin: 6px 0;
      color: #555;
    }
  }
`

export const Time = styled.div`
  padding-top: 30px;
`

const Skeleton = option => {
  return <ContentLoader backgroundColor={'#dadada'} style={{ width: '100%', height: '105px' }} {...option}>
    <rect rx="4" ry="4" width="44" height="25"></rect>
    <rect x="55" y="2.5" width="100%" height="20" ></rect>
    <rect y="35" rx="4" ry="4" width="44" height="44"></rect>
    <rect x="55" y="37" width="80" height="15"></rect>
    <rect x="55" y="58" width="80" height="15"></rect>
    <rect x="0" y="92" width="100%" height="1"></rect>
  </ContentLoader>
}

export const createSkeleton = (num = 1, option = {}) => {
  return Array.from({ length: num }, (v, i) => {
    return <Skeleton option={option} key={i} />
  })
}

export default CardWrapper
