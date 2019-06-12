import React, { useState, useEffect } from 'react'
import Utils from '@/utils/index.js'
import cnodeSDK from '@/utils/cnodeSDK';
import { withRouter } from 'react-router'

import './topic.scss'

const Topic = (props) => {
  const { location } = props
  const { tab } = Utils.searchToQuery(location.search)
  const limit = 20 

  const [page, setPage] = useState(1)
  const [list, setList] = useState([])

  useEffect(() => {
    page === 1 && setList([])
    cnodeSDK.getTopicsByTag(tab, page, limit).then(res => {
      const data = res.data.data
      setList(data)
    })
  }, [page, tab])

  return (
    <div>
      {
        list.map((item, index) => {
          return (
            <div key={index}
            >{item.title}</div>
          )
        })
      }
    </div>
  )
}

export default withRouter(Topic)