import styled from "styled-components"

const Comment = styled.div`
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
`

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  .corner-icon {
    color: #888;
    &.has-like {
      color: #333;
    }
  }
`

const CommentInfoBar = styled.div`
  flex: 1;
  margin: 0 10px;

  h3{
    margin-bottom: 4px;
    font-size: 14px;
  }

  ul {
    display: flex;
  }

  li {
    color: #aaa;
    font-size: 12px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`

export {
  Comment,
  CommentHeader,
  CommentInfoBar
}