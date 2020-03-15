import React from 'react'
import Comment from '../comment'

import {
  CommentPanelWrapper,
  Total
} from './style'

const CommentPanel = props => {
  const value = props.value

  return (
    <CommentPanelWrapper>
      <Total>共{value?.length || 0}条评论</Total>
      {
        value?.length 
          ? value.map((item, index) => {
            return (
              <Comment key={item.id} value={item} num={index + 1} />
            )
          })
          : <Comment>
            <div className="empty">暂无评论</div>
          </Comment>
      }
    </CommentPanelWrapper>
  )
}

CommentPanel.defaultProps = {
  value: []
}

export { SkeletonComment } from './style'
export default CommentPanel
