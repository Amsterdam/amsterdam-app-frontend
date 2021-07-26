import React, {useState, useEffect, createContext} from 'react'
import {useWindowDimensions} from 'react-native'

const ORIENTATION = {
  PORTRAIT: {
    portrait: true,
    landscape: false,
  },
  LANDSCAPE: {
    portrait: false,
    landscape: true,
  },
}

export const OrientationContext = createContext({})

export const OrientationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [orientation, setOrientation] = useState({})
  const window = useWindowDimensions()

  useEffect(() => {
    setOrientation(
      window.height >= window.width
        ? ORIENTATION.PORTRAIT
        : ORIENTATION.LANDSCAPE,
    )
  }, [window.height, window.width])

  return (
    <OrientationContext.Provider value={orientation}>
      {children}
    </OrientationContext.Provider>
  )
}
