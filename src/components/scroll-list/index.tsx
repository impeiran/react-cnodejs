/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useRef } from 'react'
import Loading from 'components/loading'
import styled from 'styled-components'

// polyfill
import 'intersection-observer'

export interface IProps {
  loading: boolean;
  completed: boolean;
  children: React.ReactNode;
  onLoad: () => void;
}

const TipWord = styled.div`
  margin: 10px auto;
  color: #333;
  text-align: center;
`

const ScrollList: React.FC<IProps> = (props: IProps) => {
  const { completed, onLoad, loading } = props

  // 触发命中观察的回调
  const hanlder = useCallback(entries => {
    if (completed) return
    if (entries[0].intersectionRatio > 0) {
      onLoad()
    }
  }, [completed, onLoad])

  const observer: React.RefObject<IntersectionObserver> = useRef(new IntersectionObserver(hanlder))
  const bottomEl: any = useRef<HTMLDivElement>()

  useEffect(() => {
    observer.current && observer.current.observe(bottomEl.current)

    return () => {
      observer.current && observer.current.unobserve(bottomEl.current)
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
