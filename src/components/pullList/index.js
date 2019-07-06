import React, { useCallback, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useEventListener } from '@/hooks'
import { Loader } from 'semantic-ui-react'
import Velocity from 'velocity-animate' 

import './pullList.scss'

const WIN_HEIGHT = document.documentElement.clientHeight
const TIMER_DELAY = 250
const MAX_PULL = 160
const CAN_REFRESH = 100
const TRANS_REG = /translate3d\(0px, (\d+)px/

const PullList = props => {
  const [initPull, setInitPull] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [reStatus, setReStatus] = useState(0)
  const wrapper = useRef()

  const [lastPos, setLastPos] = useState(0)
  const timer = useRef()

  const tipRender = {
    0: '下拉刷新',
    1: '释放立即刷新',
    2: null
  }

  // 触摸开始
  const touchStartHandler = useCallback( e => {
    setTouchStartY(e.touches[0].clientY)
  }, [])

  // 触摸滑动
  const touchMoveHandler = useCallback( e => {
    const currentY = e.touches[0].clientY
    const scrollTop = document.documentElement.scrollTop || window.scrollY
    const pullStatus = currentY > touchStartY && scrollTop === 0

    if (pullStatus) {
      setInitPull(pullStatus)
      const diffY = Math.max(currentY - touchStartY, 0)

      if (diffY >= CAN_REFRESH) {
        setReStatus(1)
      }
      
      if (diffY < MAX_PULL) {
        wrapper.current.style.transform = `translate3d(0, ${Math.round(diffY / 2)}px, 0)`
      }
    } else {
      setInitPull(false)
    }

  }, [touchStartY])

  // 触摸结束
  const touchEndHandler = useCallback( e => {
    if (!initPull) return
    
    const trans = wrapper.current.style.transform
    const transNum = Number(TRANS_REG.exec(trans)[1])
    wrapper.current.style.transform = `translate3d(0, 30px, 0)`
    // Velocity(wrapper.current, {
    //   translateZ: 0,
    //   translateY: 0
    // }, {
    //   duration: 5000,
    //   easing: 'easeInSine'
    // })
    setReStatus(2)
  }, [initPull])

  // 滚动处理
  const scrollHandler = useCallback( e => {
    if (props.complete) return
    if (timer.current) clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop || window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      
      if (scrollTop < lastPos) return
      setLastPos(scrollTop)

      const calcHeight = scrollTop + WIN_HEIGHT + props.offset
      if (calcHeight >= scrollHeight) {
        props.toEndHandler()
      }
    }, TIMER_DELAY)

  }, [lastPos, props])

  useEventListener('touchstart', touchStartHandler, wrapper.current)
  useEventListener('touchmove', touchMoveHandler, wrapper.current)
  useEventListener('touchend', touchEndHandler, wrapper.current)
  useEventListener('scroll', scrollHandler)

  return (
    <figure ref={wrapper} className="pull-list">
      <div className="refresh-tip">{ tipRender[reStatus] }</div>
      { props.children }
      {
        props.complete
        ? <div className="align-center">加载完毕</div>
        : <Loader active inline='centered' size="small">玩命加载中</Loader>
      }
    </figure>
  )
}

PullList.propTypes = {
  complete: PropTypes.bool,
  offset: PropTypes.number,
  toEndHandler: PropTypes.func
}

PullList.defaultProps = {
  complete: false,
  offset: 600,
  toEndHandler: () => {}
}

export default PullList
