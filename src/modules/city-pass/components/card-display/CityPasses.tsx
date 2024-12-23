import {lockAsync, OrientationLock, unlockAsync} from 'expo-screen-orientation'
import {useCallback, useEffect} from 'react'
import {AccessibilityInfo, Alert, StyleSheet, View} from 'react-native'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useBlockScreenshots} from '@/hooks/useBlockScreenshots'
import {useBrightScreen} from '@/hooks/useBrightScreen'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {CityPassesSwiper} from '@/modules/city-pass/components/card-display/CityPassesSwiper'
import {setStartIndex} from '@/modules/city-pass/slice'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  index?: number
}

export const CityPasses = ({index}: Props) => {
  const dispatch = useDispatch()
  const {isCodeValid} = useEnterAccessCode()
  const styles = useThemable(createStyles)

  useEffect(() => {
    dispatch(setStartIndex(index))
  }, [dispatch, index])

  useEffect(() => {
    void lockAsync(OrientationLock.PORTRAIT_UP)

    return () => {
      void unlockAsync()
    }
  }, [])

  const onScreenshot = useCallback(() => {
    const screenshotMessage = 'Dit scherm staat geen schermafdrukken toe'

    Alert.alert(screenshotMessage)
    AccessibilityInfo.announceForAccessibilityWithOptions(screenshotMessage, {
      queue: true,
    })
  }, [])

  useBlockScreenshots({
    onScreenshot,
  })

  useBrightScreen({})

  return isCodeValid ? (
    <View style={styles.container}>
      <CityPassesSwiper />
    </View>
  ) : null
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.cityPass.overlay,
    },
  })
