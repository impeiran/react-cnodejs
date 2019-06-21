import React, { useEffect, useState } from 'react'
import { useEventListener } from '@/hooks'

const PullList = props => {

  // const [timer, setTimer] = useState()
  let timer

  const scrollHandler = e => {
    if (timer) {
      clearTimeout(timer)
      // setTimer(undefined)
      timer = undefined
    }
    timer = setTimeout(() => {
      console.log(e)
    }, 100)
  }

  useEventListener('scroll', scrollHandler)

  return (
    <figure
    >
      { props.children }
    </figure>
  )
}

export default PullList
