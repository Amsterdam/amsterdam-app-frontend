import {useRef, useCallback, useEffect} from 'react'

export const useTimeout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>()

  const startTimeout = useCallback((callback: () => void, delay: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(callback, delay)
  }, [])

  const cancelTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(
    () => () => {
      cancelTimeout() // Clear the timeout when the hook unmounts
    },
    [cancelTimeout],
  )

  return startTimeout
}
