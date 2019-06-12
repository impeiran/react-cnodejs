import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import TopicCard from '@/components/topicCard'
import Utils from '@/utils/index.js'
import cnodeSDK from '@/utils/cnodeSDK';

import './topic.scss'

const Topic = (props) => {
  const { location } = props
  const { tab } = Utils.searchToQuery(location.search)
  const limit = 20 

  const [list, setList] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    page === 1 && setList([])
    cnodeSDK.getTopicsByTab(tab, page, limit).then(res => {
      const data = res.data.data
      setList(data)
    })
  }, [page, tab])

  return (
    <div>
      {
        list.map((item, index) => {
          return (
            <TopicCard
              key={item.id}
              data={item}
            />
          )
        })
      }
    </div>
  )
}

export default withRouter(Topic)