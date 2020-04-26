import React, { useCallback, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Card, { createSkeleton } from './card/card'
import ScrollList from 'components/scroll-list'
import useLoadMore from 'hooks/useLoadMore'
import sdk from 'service/cnode-sdk'
import isEmpty from 'utils/isEmpty'
import { Topic as TopicType } from 'types'

const PAGE_SIZE = 20

const Skeleton = createSkeleton(5)

const Topic = () => {
  const { tag = '' } = useParams()
  const history = useHistory()

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

  // 点击查看文章详情
  const visitArticle = (info: TopicType) => {
    history.push({
      pathname: `/article/${info.id}`,
      state: info
    })
  }

  return (
    <>
      { 
        hasList && 
        <ScrollList loading={loading} completed={completed} onLoad={loadMore}>
          {
            list.map((item: TopicType) => {
              return (
                <Card key={item.id} data={item} onClick={() => visitArticle(item)} />
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