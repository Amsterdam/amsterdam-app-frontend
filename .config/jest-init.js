// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup'

import {NativeModules} from 'react-native'

import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'

jest.mock('react-native-device-info', () => mockRNDeviceInfo)

jest.mock('@react-native-firebase/messaging', () => ({}))

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}))

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({children}) => children

  return {KeyboardAwareScrollView}
})

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.mock('react-native-image-crop-picker', () => ({}))
jest.mock(
  '@react-navigation/elements/lib/commonjs/assets/back-icon.png',
  () => '',
)
jest.mock(
  '@react-navigation/elements/lib/commonjs/assets/back-icon-mask.png',
  () => '',
)

jest.mock('@notifee/react-native', () =>
  require('@notifee/react-native/jest-mock'),
)

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectionMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
}
