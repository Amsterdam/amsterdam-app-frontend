import {useCallback, useState} from 'react'

export const useBoolean = (initialState = false) => {
  const [value, setValue] = useState(initialState)

  const toggle = useCallback(() => {
    setValue(oldValue => !oldValue)
  }, [])
  const enable = useCallback(() => {
    setValue(true)
  }, [])
  const disable = useCallback(() => {
    setValue(false)
  }, [])

  return {value, toggle, enable, disable}
}
