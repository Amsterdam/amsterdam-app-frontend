import {lockAsync, OrientationLock, unlockAsync} from 'expo-screen-orientation'
import {useEffect} from 'react'

export const useLockScreen = (orientation: OrientationLock) => {
  useEffect(() => {
    void lockAsync(orientation)

    return () => {
      void unlockAsync()
    }
  }, [orientation])
}
