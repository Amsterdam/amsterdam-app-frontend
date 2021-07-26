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

type Orientation = {
  portrait: boolean | undefined
  landscape: boolean | undefined
}

const initialOrientation: Orientation = {
  portrait: undefined,
  landscape: undefined,
}

export const OrientationContext = createContext(initialOrientation)

export const OrientationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [orientation, setOrientation] = useState(initialOrientation)
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
