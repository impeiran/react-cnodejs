/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from 'react'
import useAsync from './useAsync'

const noop = () => {}

const defaultOption = {
  initPage: 1,
  initPageSize: 10
}

/**
 * @param {Function} action should return a Promise
 * @param {Object} option
 * @param {Array} deps dependecies
 */
export default (action = noop, option, deps = []) => {

  option = Object.assign({}, defaultOption, option || {})

  const infoRef = useRef({
    completed: false,
    page: option.initPage || 1,
    list: []
  })

  const actionHandler = useCallback(() => {
    return action({ page: infoRef.current.page, pageSize: option.initPageSize })
  }, [action])

  const { loading, run } = useAsync(actionHandler, {
    mannual: true,
    onSuccess: res => {
      const prevList = infoRef.current.list
      const currentPage = infoRef.current.page

      const resultList = option.formatResult
        ? option.formatResult(res).list
        : res.list

      infoRef.current.list = currentPage !== 1
        ? prevList.concat(resultList)
        : resultList

      infoRef.current.completed = option.isNoMore ? option.isNoMore(res) : false
    }
  })

  const loadMore = useCallback(() => {
    infoRef.current = {
      ...infoRef.current,
      page: infoRef.current.page + 1
    }
    run()
  },[])

  useEffect(() => {
    infoRef.current = {
      page: 1,
      list: [],
      completed: false
    }
    run()
  }, [...deps])

  return {
    loading,
    loadMore,
    ...infoRef.current
  }
}
