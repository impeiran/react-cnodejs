import React from 'react'
import { withRouter } from 'react-router-dom'

const Avatar = props => {
  let { src, target, size = 50, history } = props

  size = typeof size === 'number' ? `${size}px` : size

  const sizeStyle = {
    width: size,
    height: size,
    borderRadius: '4px'
  }

  const clickHandler = e => {
    if (!target) return
    e.stopPropagation()
    history.push('/user/' + target)
  }

  return <img src={src} style={sizeStyle} alt="avatar" onClick={clickHandler}></img>
}

export default withRouter(Avatar)