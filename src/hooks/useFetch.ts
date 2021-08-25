import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {shallowEqual} from '../utils/shallowEqual'

type UseFetchProps = {
  onLoad?: Boolean
  options?: {
    params?: {
      [key: string]: string | number
    }
  }
  url: string
}

export const useFetch = <T>({url, options, onLoad = true}: UseFetchProps) => {
  const [data, setData] = useState<T | null>(null)
  const [isError, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const prevUrl = useRef<string>()

  const currentParams = useMemo(() => options?.params ?? {}, [options?.params])
  const prevParams = useRef<any>()

  const fetchData = useCallback(
    async (params = undefined) => {
      setLoading(true)
      const queryParams = {...options?.params, ...params}
      const queryString = Object.keys(queryParams)
        .map(key => key + '=' + encodeURIComponent(queryParams[key]))
        .join('&')

      try {
        const response = await fetch(url + '?' + queryString, {})
        const json = await response.json()
        setData(json.result ?? json)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [options?.params, url],
  )

  const fetchDataIfNeeded = useCallback(() => {
    return (
      onLoad &&
      (prevUrl.current !== url ||
        (prevParams.current &&
          !shallowEqual(prevParams.current, currentParams)))
    )
  }, [currentParams, onLoad, url])

  useEffect(() => {
    if (fetchDataIfNeeded()) {
      prevParams.current = currentParams
      prevUrl.current = url
      fetchData()
    }
  }, [currentParams, fetchData, fetchDataIfNeeded, url])

  return {data, fetchData, isError, isLoading}
}
