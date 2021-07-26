import React, {useState, useEffect, createContext} from 'react'
import {useWindowDimensions} from 'react-native'

export const OrientationContext = createContext({
  orientation: '',
})

export const OrientationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [orientation, setOrientation] = useState<string>('')
  const window = useWindowDimensions()

  useEffect(() => {
    setOrientation(window.height >= window.width ? 'portrait' : 'landscape')
  }, [window.height, window.width])

  return (
    <OrientationContext.Provider value={{orientation}}>
      {children}
    </OrientationContext.Provider>
  )
}
