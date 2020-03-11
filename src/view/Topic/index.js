import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card, { createSkeleton } from './Card/Card'
import sdk from '@/service/cnode-sdk'

const PAGE_SIZE = 20

const Skeleton = createSkeleton(5)

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

  return (
    <div>
      {
        !!list && list.map(item => {
          return (
            <Link key={item.id} to={`/article/${item.id}`} >
              <Card data={item} />
            </Link>
          )
        })
      }
      {
        (!list || !list.length) && page === 1 && Skeleton
      }
      
    </div>
  )
}

export default Topic