import React, {createContext, ReactNode, useEffect, useState} from 'react'
import {ScaledSize, useWindowDimensions} from 'react-native'
import {isTablet} from 'react-native-device-info'

export type Device = {
  isLandscape: boolean
  isPortrait: boolean
  isTablet: boolean
} & ScaledSize

const initialValue: Device = {
  fontScale: 1,
  height: 640,
  isLandscape: false,
  isPortrait: true,
  isTablet: false,
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
      isTablet: isTablet(),
      ...window,
    })
  }, [window])

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  )
}
