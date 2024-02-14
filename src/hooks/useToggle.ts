import {useCallback, useState} from 'react'

export const useToggle = (initialState = false) => {
  const [value, setValue] = useState(initialState)

  const toggle = useCallback(() => {
    setValue(oldValue => !oldValue)
  }, [])

  return {value, toggle}
}
