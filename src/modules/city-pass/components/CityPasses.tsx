import {lockAsync, OrientationLock, unlockAsync} from 'expo-screen-orientation'
import {useCallback, useEffect} from 'react'
import {AccessibilityInfo, Alert} from 'react-native'
import {Overlay} from '@/components/ui/containers/Overlay'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useBlockScreenshots} from '@/hooks/useBlockScreenshots'
import {useBrightScreen} from '@/hooks/useBrightScreen'
import {CityPassesSwiper} from '@/modules/city-pass/components/CityPassesSwiper'
import {DEFAULT_PASS_WIDTH} from '@/modules/city-pass/constants'
import {
  hideCityPasses,
  selectIsCityPassesVisible,
} from '@/modules/city-pass/slice'
import {ModuleClientConfig} from '@/modules/types'
import {useTheme} from '@/themes/useTheme'

export const CityPasses: ModuleClientConfig['PreRenderComponent'] = () => {
  const dispatch = useDispatch()
  const isCityPassesVisible = useSelector(selectIsCityPassesVisible)
  const {color} = useTheme()

  useEffect(() => {
    // isCityPassesVisible && Orientation.lockToPortrait()
    if (isCityPassesVisible) {
      void lockAsync(OrientationLock.PORTRAIT_UP)
    }

    return () => {
      void unlockAsync()
    }
  }, [isCityPassesVisible])

  const onScreenshot = useCallback(() => {
    const screenshotMessage = 'Dit scherm staat geen schermafdrukken toe'

    Alert.alert(screenshotMessage)
    AccessibilityInfo.announceForAccessibilityWithOptions(screenshotMessage, {
      queue: true,
    })
  }, [])

  useBlockScreenshots({
    enabled: false,
    onScreenshot,
  })

  useBrightScreen({
    enabled: isCityPassesVisible,
  })

  return isCityPassesVisible ? (
    <Overlay
      backgroundColor={color.cityPass.overlay}
      closeButtonContainerWidth={DEFAULT_PASS_WIDTH}
      onClose={() => {
        dispatch(hideCityPasses())
      }}>
      <CityPassesSwiper />
    </Overlay>
  ) : null
}

CityPasses.renderBeforeServerModules = true
