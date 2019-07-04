import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'

import TopicCard from '@/components/topicCard'
import PullList from '@/components/pullList'
import { Loader } from 'semantic-ui-react'
// import Skeleton from '@/components/Skeleton'

import Utils from '@/utils/index.js'
import cnodeSDK from '@/utils/cnodeSDK';

import './topic.scss'

const Topic = (props) => {
  const limit = 20 
  const { history, location } = props
  const { tab } = Utils.searchToQuery(location.search)
  
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [complete, setComplete] = useState(false)

  const loadMore = () => {
    setPage(page => page + 1)
  }

  const readArticle = item => {
    history.push(`/article?id=${item.id}`)
  }

  // 分类变化 重置部分数据
  useEffect(() => {
    setPage(1)
    setList([])
    setComplete(false)
    window.scrollTo(0, 0)
  }, [tab])

  // 当页数和分类变化时触发加载
  useEffect(() => {
    cnodeSDK.getTopicsByTab(tab, page, limit).then(res => {
      const data = res.data.data
      if (data.length < limit) {
        setComplete(true)
      }
      setList(list => list.concat(data))
    })
  }, [page, tab])

  return (
    <div className="topic-list">
    {
      list.length 
      ? <PullList complete={complete} toEndHandler={loadMore}>
        {
          list.map( (item) => {
            return (
              <TopicCard
                key={item.id}
                data={item}
                onClick={item => readArticle(item)}
              />
            )
          })
        }
        </PullList>
      : <Loader active inline='centered' size="medium">玩命加载中</Loader>
    }
    </div>
  )
}

export default withRouter(Topic)