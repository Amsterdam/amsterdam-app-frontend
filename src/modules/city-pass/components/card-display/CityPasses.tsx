import {lockAsync, OrientationLock, unlockAsync} from 'expo-screen-orientation'
import {useCallback, useEffect} from 'react'
import {AccessibilityInfo, Alert} from 'react-native'
import {Overlay} from '@/components/ui/containers/Overlay'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useBlockScreenshots} from '@/hooks/useBlockScreenshots'
import {useBrightScreen} from '@/hooks/useBrightScreen'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {CityPassesSwiper} from '@/modules/city-pass/components/card-display/CityPassesSwiper'
import {DEFAULT_PASS_WIDTH} from '@/modules/city-pass/constants'
import {
  hideCityPasses,
  selectIsCityPassesVisible,
} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {useTheme} from '@/themes/useTheme'

export const CityPasses: ModuleClientConfig['PreRenderComponent'] = () => {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const isCityPassesVisible = useSelector(selectIsCityPassesVisible)
  const {isCodeValid, isEnteringCode} = useAccessCode()
  const {color} = useTheme()

  useEffect(() => {
    if (isCityPassesVisible && !isCodeValid) {
      navigate(ModuleSlug['access-code'], {
        screen: AccessCodeRouteName.accessCode,
      })
    }
  }, [dispatch, isCityPassesVisible, isCodeValid, navigate])

  useEffect(() => {
    if (!isEnteringCode && !isCodeValid) {
      dispatch(hideCityPasses())
    }
  }, [dispatch, isCodeValid, isEnteringCode])

  useEffect(() => {
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
    enabled: isCityPassesVisible,
    onScreenshot,
  })

  useBrightScreen({
    enabled: isCityPassesVisible,
  })

  return isCityPassesVisible && isCodeValid ? (
    <Overlay
      backgroundColor={color.cityPass.overlay}
      closeButtonContainerWidth={DEFAULT_PASS_WIDTH}
      onClose={() => {
        dispatch(hideCityPasses())
      }}>
      {<CityPassesSwiper />}
    </Overlay>
  ) : null
}

CityPasses.renderBeforeServerModules = true
