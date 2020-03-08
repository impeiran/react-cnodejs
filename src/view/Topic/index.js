import React from 'react'
import { useParams } from 'react-router-dom'

const Topic = props => {
  const { tag } = useParams()
  console.log(tag)
  return (
    <div>{ tag }</div>
  )
}

export default React.memo(Topic)