import React from 'react'
import { Label } from 'semantic-ui-react'

const TopicLabel = (props) => {
  const { info } = props

  let color, dict

  if (info.top) {
    color = 'red'
    dict = '置顶'
  } else if (info.good) {
    color = 'orange'
    dict = '精华'
  } else {
    switch (info.tab) {
      case 'ask':
        color = 'blue'
        dict = '问答'
        break
      case 'share':
        color = 'teal'
        dict = '分享'
        break
      case 'job':
        color = 'olive'
        dict = '招聘'
        break
      default:
        color = 'grey'
        dict = '话题'
        break
    }
  }

  return <Label color={color}>{ dict }</Label>
 
}

export default TopicLabel