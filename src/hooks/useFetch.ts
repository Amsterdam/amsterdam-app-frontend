import {useCallback, useEffect, useState} from 'react'

type UseFetchProps = {
  onLoad?: Boolean
  options?: {
    params?: string
  }
  url: string
}

export const useFetch = <T>({url, options, onLoad = true}: UseFetchProps) => {
  const [data, setData] = useState<T | null>(null)
  const [isError, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const fetchData = useCallback(
    async (params: string = '') => {
      const abortController = new AbortController()
      const signal = abortController.signal

      setLoading(true)
      try {
        const response = await fetch(url + (options?.params ?? params))
        const json = await response.json()
        !signal.aborted && setData(json.result)
      } catch (error) {
        !signal.aborted && setError(error)
      } finally {
        !signal.aborted && setLoading(false)
      }

      return () => {
        abortController.abort()
      }
    },
    [options?.params, url],
  )

  useEffect(() => {
    onLoad && fetchData()
  }, [fetchData, onLoad])

  return {data, fetchData, isError, isLoading}
}
