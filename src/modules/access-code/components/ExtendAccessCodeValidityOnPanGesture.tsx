import {ReactNode, useMemo} from 'react'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {runOnJS} from 'react-native-reanimated'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'

type Props = {
  children: ReactNode
}

export const ExtendAccessCodeValidityOnPanGesture = ({children}: Props) => {
  const {onExtendAccessCodeValidity} = useEnterAccessCode()

  const gesture = useMemo(
    () =>
      Gesture.Pan().onBegin(() => {
        runOnJS(onExtendAccessCodeValidity)()
      }),
    [onExtendAccessCodeValidity],
  )

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>
}
