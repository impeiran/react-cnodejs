import React from 'react'
import styled from 'styled-components'

import { 
  COLOR_RED,
  COLOR_ORANGE_DEEP,
  COLOR_BLUE_PRIMARY,
  COLOR_GREEN_TEAL,
  COLOR_GREEN_OLIVE,
  COLOR_GREY_INFO
} from 'style/constants'

interface IProps {
  type: string
}

interface cate {
  text: string;
  color: string;
}

interface TagDict {
  [index: string]: cate;
}

const DICT: TagDict = {
  top: { text: '置顶', color: COLOR_RED },
  good: { text: '精华', color: COLOR_ORANGE_DEEP },
  share: { text: '分享', color: COLOR_GREEN_TEAL },
  ask: { text: '问答', color: COLOR_BLUE_PRIMARY },
  job: { text: '招聘', color: COLOR_GREEN_OLIVE },
  default: { text: '话题', color: COLOR_GREY_INFO },
}

const TagUI = styled.label<{ color: string }>`
  display: inline-block;
  padding: 7px 10px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  background-color: ${props => props.color};
  border-radius: 4px;
`

const Tag: React.FC<IProps> = (props: IProps) => {
  const type = props.type || 'default'
  return <TagUI color={ DICT[type].color }>{ DICT[type].text }</TagUI>
}

export default React.memo(Tag)
