/* eslint-disable no-console */

// ignore list for false positive console warnings
const warningMessagesIgnoreList = [
  // this warning is because the code is not running on a device
  'Using an insecure random number generator, this should only happen when running in a debugger without support for crypto.getRandomValue',
  // react-native-flipper is only necessary for local builds, but Jest cannot infer that from the logic
  'The native module for Flipper seems unavailable. Please verify that `react-native-flipper` is installed as yarn dependency to your project and, for iOS, that `pod install` is run in the `ios` directory.',
]

const originalWarn = console.warn.bind(console.warn)

const matchesIgnoreList = (...args) => {
  console.log(...args)

  return args.some(arg => arg.includes(warningMessagesIgnoreList))
}

beforeAll(() => {
  console.log('beforeAll')

  console.warn = (...args) => {
    if (matchesIgnoreList(...args)) {
      console.log('hi', ...args)
      console.log('override!')

      return
    }

    originalWarn(...args)
  }
})

afterAll(() => {
  console.warn = originalWarn

  console.log('afterAll')
})
