import {useEffect} from 'react'
import {ImageSourcePropType} from 'react-native'
import {
  enableBlockScreenshot,
  disableBlockScreenshot,
  addEventListener,
} from 'react-native-block-screenshot'
import {useTheme} from '@/themes/useTheme'

export const useBlockScreenshots = ({
  enabled = true,
  onScreenshot,
}: {
  enabled?: boolean
  onScreenshot?: () => void
}) => {
  const {color} = useTheme()

  useEffect(() => {
    if (enabled) {
      void enableBlockScreenshot({
        backgroundColor: color.appSwitcher.background,
        scale: 0.33,
        source: require('@/assets/images/logoWhite.png') as ImageSourcePropType,
      })
    }

    const unregister =
      onScreenshot && enabled ? addEventListener(onScreenshot) : () => null

    return () => {
      unregister()
      void disableBlockScreenshot()
    }
  }, [color, enabled, onScreenshot])
}
