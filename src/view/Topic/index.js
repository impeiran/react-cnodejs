import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card/Card'
import sdk from '@/service/cnode-sdk'

const PAGE_SIZE = 20

const Topic = props => {
  const { tag } = useParams()

  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [completed, setCompleted] = useState(false)

  const getTopicsByTab = useCallback(page => {
    sdk.getTopicsByTab(tag, page, PAGE_SIZE).then(({ data }) => {
      setCompleted(!data || data.length > PAGE_SIZE)
      setList(prevlist => prevlist.concat(data))
    })
  }, [tag])

  useEffect(() => {
    setPage(1)
    setList([])
  }, [tag])

  useEffect(() => {
    getTopicsByTab(page)
  }, [page, getTopicsByTab])

  console.log('render component' )
  return (
    <div style={{ padding: '15px' }}>
      {
        !!list && list.map(item => {
          return <Card key={item.id} data={item} />
        })
      }
    </div>
  )
}

export default Topic