/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react'

const noop = () => {}
const defaultOption = {
  mannual: false,
  onError: noop
}

const useAysnc = (action = noop, option = {}, deps = []) => {
  option = Object.assign(option, defaultOption)

  const result = useRef({})
  const [loading, setLoading] = useState(false)

  const run = useCallback(() => {
    setLoading(true)
    const ret = action()
    if (ret.then) {
      ret.then(res => result.current = res)
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
