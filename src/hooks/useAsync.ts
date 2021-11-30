import {useEffect} from 'react'

export const useAsync = (
  asyncFn: () => Promise<boolean>,
  onSuccess: (data: any) => void,
) => {
  useEffect(() => {
    let isActive = true
    asyncFn().then(data => {
      if (isActive) {
        onSuccess(data)
      }
    })
    return () => {
      isActive = false
    }
  }, [asyncFn, onSuccess])
}
