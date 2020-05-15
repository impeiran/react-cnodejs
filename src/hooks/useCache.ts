interface CacheData {
  expire: number;
  data: any;
}

let cacheMap: Map<string, CacheData>

/**
 * 缓存数据
 * @param cacheKey 缓存的key值
 * @param defaultData 默认值
 * @param expire 缓存时间，默认为-1即无限期，若为正数，单位为ms
 */
const useCache = <T, K>(cacheKey: string, defaultData?: T, expire: number = -1) => {
  cacheMap || (cacheMap = new Map())

  // 设置缓存
  const setCache = (data: any) => {
    return expire !== -1
      ? cacheMap.set(cacheKey, {
        expire: Date.now() + expire,
        data
      })
      : cacheMap.set(cacheKey, { data, expire })
  }

  let result: K | T | undefined

  if (cacheMap.has(cacheKey)) {
    const current = cacheMap.get(cacheKey)

    if (
      current && 
      current?.expire !== -1 && 
      current?.expire < Date.now()
    ) {
      // 缓存数据已过期
      cacheMap.delete(cacheKey)
      result = defaultData
    } else {
      // 命中缓存
      result = current?.data
    }
  } else {
    // 首次使用，返回默认值
    result = defaultData
  }

  return [result, setCache]
}

export default useCache