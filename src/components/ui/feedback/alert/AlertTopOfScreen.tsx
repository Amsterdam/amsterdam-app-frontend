import {useCallback} from 'react'
import {LayoutAnimation} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {resetAlert, selectAlert} from '@/store/slices/alert'

export const AlertTopOfScreen = () => {
  const dispatch = useDispatch()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  const alert = useSelector(selectAlert)

  const reset = useCallback(() => dispatch(resetAlert()), [dispatch])

  const onPress = () => {
    if (!isReduceMotionEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    dispatch(resetAlert())
  }

  useBlurEffect(reset)

  if (!alert.content) {
    return null
  }

  return (
    <Pressable
      onPress={onPress}
      testID={alert.testID}>
      <AlertBase
        {...alert}
        inset="md"
      />
    </Pressable>
  )
}
