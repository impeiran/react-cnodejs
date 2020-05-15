import React, { useCallback, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Card, { createSkeleton } from './card/card'
import ScrollList from 'components/scroll-list'
import useLoadMore from 'hooks/useLoadMore'
import sdk from 'service/cnode-sdk'
import isEmpty from 'utils/isEmpty'
import { Topic as TopicType } from 'types'
import useCache from 'hooks/useCache'

const PAGE_SIZE = 20

const Skeleton = createSkeleton(5)

const Topic = () => {
  const { tag = '' } = useParams()
  const history = useHistory()

  const [cachePage, setCachePage] = useCache(tag + 'Page', 1, 45000)
  const [cacheList, setCacheList] = useCache(tag + 'List', [], 45000)

  console.log(cacheList)

  const getTopicsByTab = useCallback(info => {
    return sdk.getTopicsByTab(tag, info.page || 1, PAGE_SIZE)
  }, [tag])

  // 无限滚动分页加载数据
  let { list, page, loading, loadMore, completed } = useLoadMore(getTopicsByTab, {
    initPage: cachePage,
    initPageSize: 20,
    defaultResult: { list: cacheList },
    formatResult: ({ response: { data = [] } = {} }) => {
      return { list: data } 
    },
    isNoMore: ({ data }) => {
      return data && data.length > PAGE_SIZE
    }
  }, [tag])

  setCachePage(page)
  setCacheList(list)

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