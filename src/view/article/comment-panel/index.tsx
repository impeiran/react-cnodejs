import React from 'react'
import Comment from '../comment'

import {
  CommentPanelWrapper,
  Total
} from './style'

import { Comment as CommentType } from 'types'

interface IProps {
  value?: CommentType[];
  articleAuthor: string;
}

const CommentPanel: React.FC<IProps> = (props: IProps) => {
  const { value, articleAuthor } = props

  return (
    <CommentPanelWrapper>
      <Total>共{value?.length || 0}条评论</Total>
      {
        value?.length 
          ? value.map((item: CommentType, index: number) => {
            return (
              <Comment 
                key={item.id} 
                value={item}
                articleAuthor={articleAuthor}
                num={index + 1} 
              />
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
