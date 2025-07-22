import {useRef, useCallback, useEffect} from 'react'

export const useTimeout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      } // Clear the timeout when the hook unmounts
    },
    [],
  )

  return useCallback((callback: () => void, delay: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(callback, delay)
  }, [])
}
