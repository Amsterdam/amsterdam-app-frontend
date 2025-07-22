import {createContext} from 'react'
import {ScaledSize} from 'react-native'

export type Device = {
  isLandscape: boolean
  isPortrait: boolean
  isTablet: boolean
  isTallPhone: boolean
} & ScaledSize

export const initialValue: Device = {
  fontScale: 1,
  height: 640,
  isLandscape: false,
  isPortrait: true,
  isTablet: false,
  isTallPhone: true,
  scale: 1,
  width: 360,
}

export const DeviceContext = createContext(initialValue)
