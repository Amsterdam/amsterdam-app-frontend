import React, {createContext, useEffect, useState} from 'react'
import {useWindowDimensions} from 'react-native'

type Device = {
  isLandscape: boolean | undefined
  isPortrait: boolean | undefined
}

const initialValue: Device = {
  isLandscape: undefined,
  isPortrait: undefined,
}

export const DeviceContext = createContext(initialValue)

type Props = {
  children: React.ReactNode
}

export const DeviceProvider = ({children}: Props) => {
  const [value, setValue] = useState(initialValue)
  const window = useWindowDimensions()

  useEffect(() => {
    setValue({
      isLandscape: window.height < window.width,
      isPortrait: window.height >= window.width,
    })
  }, [window.height, window.width])

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  )
}
