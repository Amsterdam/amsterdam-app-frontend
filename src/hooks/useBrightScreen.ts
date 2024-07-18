import DeviceBrightness from '@adrianso/react-native-device-brightness'
import {useEffect} from 'react'

export const useBrightScreen = ({enabled = true}: {enabled?: boolean} = {}) =>
  useEffect(() => {
    if (enabled) {
      const oldBrightness = DeviceBrightness.getBrightnessLevel()

      void oldBrightness.then(() => {
        void DeviceBrightness.setBrightnessLevel(1)
      })

      return () => {
        void oldBrightness.then(brightness => {
          void DeviceBrightness.setBrightnessLevel(brightness)
        })
      }
    } else {
      return () => null
    }
  }, [enabled])
