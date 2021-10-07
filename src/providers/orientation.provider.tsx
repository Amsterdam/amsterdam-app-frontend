import React, {createContext, useEffect, useState} from 'react'
import {useWindowDimensions} from 'react-native'

type Orientation = {
  isLandscape: boolean | undefined
  isPortrait: boolean | undefined
}

const initialOrientation: Orientation = {
  isLandscape: undefined,
  isPortrait: undefined,
}

export const OrientationContext = createContext(initialOrientation)

type Props = {
  children: React.ReactNode
}

export const OrientationProvider = ({children}: Props) => {
  const [orientation, setOrientation] = useState(initialOrientation)
  const window = useWindowDimensions()

  useEffect(() => {
    setOrientation({
      isLandscape: window.height < window.width,
      isPortrait: window.height >= window.width,
    })
  }, [window.height, window.width])

  return (
    <OrientationContext.Provider value={orientation}>
      {children}
    </OrientationContext.Provider>
  )
}
