import {useFlipper} from '@react-navigation/devtools'
import {RefObject} from 'react'
import {Platform} from 'react-native'

/** Flipper is deprecated and will no longer work when use_frameworks is enabled for iOS, so we use it for Android only */
export const useFlipperForAndroid =
  Platform.OS === 'android' ? useFlipper : (_ref: RefObject<unknown>) => null
