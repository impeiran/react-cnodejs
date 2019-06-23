import React, { useCallback, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useEventListener } from '@/hooks'
import { Loader } from 'semantic-ui-react'

const WIN_HEIGHT = document.documentElement.clientHeight
const TIMER_DELAY = 250

const PullList = props => {

  const [lastPos, setLastPos] = useState(0)
  const timer = useRef()

  const scrollHandler = useCallback(e => {
    if (props.complete) {
      return
    }

    if (timer.current) {
      clearTimeout(timer.current)
    }

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

  useEventListener('scroll', scrollHandler)

  return (
    <figure>
      { props.children }
      {
        props.complete ? <div className="align-center">加载完毕</div> : <Loader active inline='centered' size="small">玩命加载中</Loader>
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
