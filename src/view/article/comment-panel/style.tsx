import React from 'react'
import styled from 'styled-components'
import ContentLoader from 'react-content-loader'

const Total = styled.h3`
  margin: 10px 0;
  font-size: 16px;
`

const CommentPanelWrapper = styled.div`
  .empty {
    margin: 10px 0;
    text-align: center;
  }
  border-top: 1px solid #ddd;
`

export const SkeletonComment = (props: { num?: number }) => {
  return (
    <>
      <ContentLoader backgroundColor={'#dadada'} style={{ width: '100%', height: '50px' }}>
        <rect y="2" width="100%" height="1"></rect>
        <rect y="12" width="30%" height="20"></rect>
      </ContentLoader>
      {
        Array.from({ length: props.num || 2 }, (v, i) => {
          return (
            <ContentLoader key={i} backgroundColor={'#dadada'} style={{ width: '100%' }}>
              <rect rx="4" ry="4" width="28" height="28"></rect>
              <rect x="36" y="2" width="45" height="12"></rect>
              <rect x="36" y="16" width="60" height="12"></rect>
              <rect y="38" width="90%" height="20"></rect>
              <rect y="68" width="60%" height="20"></rect>
              <rect y="98" width="85%" height="20"></rect>
            </ContentLoader>
          )
        })
      }
    </>
  )
}

export {
  CommentPanelWrapper,
  Total
}