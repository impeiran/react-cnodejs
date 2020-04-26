/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

function useInitPosition (...args) {
  useEffect(() => {
    window.scrollTo.apply(null, args)
  }, [])
}

export default useInitPosition