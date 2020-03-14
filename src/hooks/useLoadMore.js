/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from 'react'

const noop = () => {}

const defaultOption = {
  initPageSize: 10
}

/**
 * @param {Function} action should return a Promise
 * @param {Object} option
 * @param {Array} deps dependecies
 */
export default (action = noop, option, deps = []) => {
  option = Object.assign(option || {}, defaultOption)

  const [loading, setLoading] = useState(false)

  const infoRef = useRef({
    completed: false,
    page: 1,
    list: []
  })

  const handler = useCallback(() => {
    if (action) {
      const ret = action({ page: infoRef.current.page, pageSize: option.initPageSize })

      if (ret.then) {
        ret.then(res => {
          const prevList = infoRef.current.list
          infoRef.current.list = prevList.concat(option.formatResult
            ? option.formatResult(res).list
            : res.list
          )
          infoRef.current.completed = option.isNoMore ? option.isNoMore(res) : false
        }).finally(() => setLoading(false))
      }
    }
  }, [action, option])

  const loadMore = useCallback(
    () => {
      infoRef.current = {
        ...infoRef.current,
        page: infoRef.current.page + 1
      }
      setLoading(true)
    },
    []
  )

  const page = infoRef.current.page

  useEffect(() => {
    infoRef.current = {
      page: 1,
      list: [],
      completed: false
    }
    setLoading(true)
  }, [...deps])

  useEffect(() => {
    setLoading(true)
    handler()
  }, [page])

  return {
    loading,
    loadMore,
    ...infoRef.current
  }
}
