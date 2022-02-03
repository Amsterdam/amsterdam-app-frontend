import React, {createContext, ReactNode, useEffect, useState} from 'react'
import {ScaledSize, useWindowDimensions} from 'react-native'

type Device = {
  isLandscape: boolean | undefined
  isPortrait: boolean | undefined
} & ScaledSize

const initialValue: Device = {
  fontScale: 1,
  height: 640,
  isLandscape: false,
  isPortrait: true,
  scale: 1,
  width: 360,
}

export const DeviceContext = createContext(initialValue)

type Props = {
  children: ReactNode
}

export const DeviceProvider = ({children}: Props) => {
  const [value, setValue] = useState(initialValue)
  const window = useWindowDimensions()

  useEffect(() => {
    setValue({
      isLandscape: window.height < window.width,
      isPortrait: window.height >= window.width,
      ...window,
    })
  }, [window])

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  )
}
