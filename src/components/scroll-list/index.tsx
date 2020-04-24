/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useRef } from 'react'
import Loading from '@/components/loading'
import styled from 'styled-components'

// polyfill
import 'intersection-observer'

const TipWord = styled.div`
  margin: 10px auto;
  color: #333;
  text-align: center;
`

const ScrollList = props => {
  const { completed, onLoad, loading } = props

  const hanlder = useCallback(entries => {
    if (completed) return
    if (entries[0].intersectionRatio > 0) {
      onLoad()
    }
  }, [completed, onLoad])

  const observer = useRef(new IntersectionObserver(hanlder))
  const bottomEl = useRef()

  useEffect(() => {    
    observer.current.observe(bottomEl.current)

    return () => {
      observer.current.unobserve(bottomEl.current)
    }
  }, [])

  return (
    <div>
      { props.children }
      <div ref={bottomEl}>
        { loading && !completed && <Loading text='玩命加载中' /> }
        { !loading && completed && <TipWord>加载完成</TipWord>}
      </div>
    </div>
  )
}

export default React.memo(ScrollList)
