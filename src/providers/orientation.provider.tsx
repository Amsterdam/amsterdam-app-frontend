import React, {createContext, useEffect, useState} from 'react'
import {useWindowDimensions} from 'react-native'

type Orientation = {
  isPortrait: boolean | undefined
}

const initialOrientation: Orientation = {
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
    setOrientation({isPortrait: window.height >= window.width})
  }, [window.height, window.width])

  return (
    <OrientationContext.Provider value={orientation}>
      {children}
    </OrientationContext.Provider>
  )
}
