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
    async (abortController, params: string = '') => {
      setLoading(true)

      try {
        const response = await fetch(url + (options?.params ?? params), {
          headers: {
            Accept: 'application/json',
          },
          signal: abortController.signal,
        })
        const json = await response.json()
        setData(json.result ?? json)
      } catch (error) {
        !abortController.signal.aborted && setError(error)
      } finally {
        !abortController.signal.aborted && setLoading(false)
      }
    },
    [options?.params, url],
  )

  useEffect(() => {
    const abortController = new AbortController()

    onLoad && fetchData(abortController)

    return () => {
      abortController.abort()
    }
  }, [fetchData, onLoad])

  return {data, fetchData, isError, isLoading}
}
