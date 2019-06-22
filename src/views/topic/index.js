import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'

import TopicCard from '@/components/topicCard'
import PullList from '@/components/pullList'

import Utils from '@/utils/index.js'
import cnodeSDK from '@/utils/cnodeSDK';

import './topic.scss'

const Topic = (props) => {
  const { location } = props
  const { tab } = Utils.searchToQuery(location.search)
  const limit = 20 

  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [complete, setComplete] = useState(false)

  const loadMore = () => {
    setPage(page => page + 1)
  }

  useEffect(() => {
    setPage(1)
    setList([])
    setComplete(false)
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
            />
          )
        })
      }
      </PullList>
      : null
    }
    </div>
  )
}

export default withRouter(Topic)