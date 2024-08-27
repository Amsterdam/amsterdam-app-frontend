import {LayoutAnimation} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useAlert} from '@/store/slices/alert'

export const AlertTopOfScreen = () => {
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const {resetAlert, alert} = useAlert()

  const onPress = () => {
    if (!isReduceMotionEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    resetAlert()
  }

  useBlurEffect(resetAlert)

  if (!alert.text) {
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
