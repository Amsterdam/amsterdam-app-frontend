import {useEffect} from 'react'

/**
 *
 * @param refetch function that should be called to refetch data
 * @param delay time in milliseconds before refetches, set to 0 to disable
 */
export const useRefetchTimeout = (refetch: () => void, delay: number) => {
  useEffect(() => {
    if (delay > 0) {
      const timeoutId = setTimeout(refetch, delay)

      return () => clearTimeout(timeoutId)
    }
  }, [refetch, delay])
}
