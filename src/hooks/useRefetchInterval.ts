import {useEffect} from 'react'

export const useRefetchInterval = (refetch: () => void, interval: number) => {
  useEffect(() => {
    const intervalId = setInterval(refetch, interval)
    return () => clearInterval(intervalId)
  }, [refetch, interval])
}
