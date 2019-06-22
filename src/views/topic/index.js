import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { createHashHistory } from 'history'

import TopicCard from '@/components/topicCard'
import PullList from '@/components/pullList'
import Skeleton from '@/components/Skeleton'

import Utils from '@/utils/index.js'
import cnodeSDK from '@/utils/cnodeSDK';

import './topic.scss'

const Topic = (props) => {
  const limit = 20 
  const { location } = props
  const { tab } = Utils.searchToQuery(location.search)
  const history = new createHashHistory()

  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [complete, setComplete] = useState(false)

  const loadMore = () => {
    setPage(page => page + 1)
  }

  const readArticle = item => {
    history.push(`/article?id=${item.id}`)
  }

  useEffect(() => {
    setPage(1)
    setList([])
    setComplete(false)
    window.scrollTo(0, 0)
  }, [tab])

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
      list.length ?
      <PullList
        complete={complete}
        toEndHandler={loadMore}
        
      >
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
      : <Skeleton />
    }
    </div>
  )
}

export default withRouter(Topic)