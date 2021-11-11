import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {shallowEqual} from '../utils/shallowEqual'

type UseFetchProps = {
  onLoad?: Boolean
  options?: {
    body?: string
    headers?: Headers
    method?: 'GET' | 'POST'
    params?: {
      [key: string]: string | number
    }
  }
  url: string
}

export const useFetch = <T>({url, options, onLoad = true}: UseFetchProps) => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [hasError, setHasError] = useState<Boolean>(false)
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const prevUrl = useRef<string>()

  const currentParams = useMemo(() => options?.params ?? {}, [options?.params])
  const prevParams = useRef<any>()

  const fetchData = useCallback(
    // TODO Refactor signature to object
    async (params = undefined, body = undefined) => {
      setIsLoading(true)
      const queryParams = {...options?.params, ...params}
      const queryString = Object.keys(queryParams)
        .map(key => key + '=' + encodeURIComponent(queryParams[key]))
        .join('&')

      try {
        const response = await fetch(url + '?' + queryString, {
          ...options,
          body: body ?? options?.body ?? '',
        })
        const json = await response.json()
        setData(json.result ?? json)
      } catch (error) {
        setHasError(!!error)
      } finally {
        setIsLoading(false)
      }
    },
    [options, url],
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

  return {data, fetchData, hasError, isLoading}
}
