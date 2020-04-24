/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react'

const noop = () => {}
const defaultOption = {
  mannual: false,
  onSuccess: noop,
  onError: noop
}

/**
 * @param {Function} action should return a Promise
 * @param {Object} option
 * @param {Array} deps dependecies
 */
const useAysnc = (action = noop, option = {}, deps = []) => {
  option = Object.assign({}, defaultOption, option)

  const result = useRef({})
  const [loading, setLoading] = useState(false)

  const run = useCallback(() => {
    setLoading(true)
    const ret = action()
    if (ret.then) {
      ret.then(res => {
        result.current = option.onSuccess(res) || res
      })
      .catch(option.onError)
      .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [action])

  useEffect(() => {
    !option.mannual && run()
  }, [])

  return {
    loading,
    run,
    result: result.current || {},
  }
}

export default useAysnc
