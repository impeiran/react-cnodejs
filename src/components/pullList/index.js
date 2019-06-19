import React, { useEffect, useState } from 'react'
// import _func from 'lodash/function'

// 上拉加载
// 下拉刷新
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

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => {
      console.log('remove')
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  return (
    <figure
    >
      { props.children }
    </figure>
  )
}

export default PullList
