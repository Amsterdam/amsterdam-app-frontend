import {LayoutAnimation} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setAutomaticLogoutAlertDismissed} from '@/modules/city-pass/slice'
import {useAlert} from '@/store/slices/alert'
import {isEmptyObject} from '@/utils/object'

export const AlertTopOfScreen = () => {
  const dispatch = useDispatch()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const {resetAlert, alert} = useAlert()

  const onPress = () => {
    if (!isReduceMotionEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    // TODO: remove after 2025-07-31
    if (alert.testID === 'CityPassAutomaticLogoutAlert') {
      dispatch(setAutomaticLogoutAlertDismissed(true))
    }

    resetAlert()
  }

  useBlurEffect(resetAlert)

  if (isEmptyObject(alert)) {
    return null
  }

  return (
    <Pressable
      onPress={onPress}
      testID={alert.testID}
      variant="transparent">
      <AlertBase
        {...alert}
        hasCloseIcon
        hasIcon
        inset="md"
      />
    </Pressable>
  )
}
