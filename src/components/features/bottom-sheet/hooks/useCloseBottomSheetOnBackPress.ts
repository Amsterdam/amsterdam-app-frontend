import {useEffect} from 'react'
import {BackHandler} from 'react-native'
import {
  useBottomSheet,
  useBottomSheetSelectors,
} from '@/store/slices/bottomSheet'

export const useCloseBottomSheetOnBackPress = () => {
  const {close} = useBottomSheet()
  const {isOpen} = useBottomSheetSelectors()

  useEffect(() => {
    const onBackPress = () => {
      if (isOpen) {
        close()

        return true // prevent default back action
      }

      return false
    }
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    )

    return () => subscription.remove()
  }, [isOpen, close])
}
