import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card, { createSkeleton } from './Card/Card'
import ScrollList from '@/components/ScrollList'
import sdk from '@/service/cnode-sdk'

const PAGE_SIZE = 20

const Skeleton = createSkeleton(5)

const Topic = props => {
  const { tag } = useParams()

  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const getTopicsByTab = useCallback(page => {
    setLoading(true)
    sdk.getTopicsByTab(tag, page, PAGE_SIZE).then(({ data }) => {
      setCompleted(!data || data.length > PAGE_SIZE)
      setList(prevList => prevList.concat(data))
    }).finally(() => setLoading(false))
  }, [tag])

  useEffect(() => {
    setPage(1)
    setList([])
  }, [tag])

  useEffect(() => {
    getTopicsByTab(page)
    // eslint-disable-next-line
  }, [page])

  const hasList = !!list && !!list.length

  return (
    <>
      { 
        hasList && 
        <ScrollList loading={loading} completed={completed} onLoad={() => setPage(page => page + 1)}>
          {
            list.map(item => {
              return (
                <Link key={item.id} to={`/article/${item.id}`} >
                  <Card data={item} />
                </Link>
              )
            })
          }
        </ScrollList>
      }
      {
        !hasList && page === 1 && Skeleton
      }
    </>
  )
}

export default Topic