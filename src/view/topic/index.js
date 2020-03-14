import React, { useCallback, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card, { createSkeleton } from './card/card'
import ScrollList from '@/components/scroll-list'
import useLoadMore from '@/hooks/useLoadMore'
import sdk from '@/service/cnode-sdk'
import isEmpty from '@/utils/isEmpty'

const PAGE_SIZE = 20

const Skeleton = createSkeleton(5)

const Topic = () => {
  const { tag } = useParams()

  const getTopicsByTab = useCallback(info => {
    return sdk.getTopicsByTab(tag, info.page || 1, PAGE_SIZE)
  }, [tag])

  const { list, loading, loadMore, completed } = useLoadMore(getTopicsByTab, {
    initPageSize: 20,
    formatResult: ({ data }) => { return { list: data } },
    isNoMore: ({ data }) => {
      return data && data.length > PAGE_SIZE
    }
  }, [tag])

  const hasList = useMemo(() => !isEmpty(list), [list])

  return (
    <>
      { 
        hasList && 
        <ScrollList loading={loading} completed={completed} onLoad={loadMore}>
          {
            list.map(item => {
              return (
                <Link key={item.id} to={{ pathname: `/article/${item.id}`, state: { info: item } }} >
                  <Card data={item} />
                </Link>
              )
            })
          }
        </ScrollList>
      }
      { !hasList && Skeleton }
    </>
  )
}

export default Topic