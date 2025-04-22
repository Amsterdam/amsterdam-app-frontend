import {useEffect} from 'react'

/**
 *
 * @param refetch function that should be called to refetch data
 * @param interval time in milliseconds between refetches, set to 0 to disable
 */
export const useRefetchInterval = (refetch: () => void, interval: number) => {
  useEffect(() => {
    if (interval > 0) {
      const intervalId = setInterval(refetch, interval)

      return () => clearInterval(intervalId)
    }
  }, [refetch, interval])
}
