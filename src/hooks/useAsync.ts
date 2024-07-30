import {useCallback, useEffect} from 'react'

/**
 * Hook to execute a function asynchronously
 * @param fn Function to be executed asynchronously
 * @param deps Dependencies to be passed to the function
 */
export const useAsync = (fn: () => Promise<void>, deps: unknown[]) => {
  const asyncFn = useCallback(() => {
    void fn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(asyncFn, [asyncFn])
}
