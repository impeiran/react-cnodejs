import React from 'react'
import Utils from '@/utils/index.js';
import { withRouter } from 'react-router'

import './topic.scss'

const Topic = (props) => {
  const { location } = props
  const { tag } = new Utils().searchToQuery(location.search)
  console.log(tag)
  return (
    <div>
      topic
    </div>
  )
}

export default withRouter(Topic)