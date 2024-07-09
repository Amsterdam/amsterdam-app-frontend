import {View, StyleSheet} from 'react-native'
import {useAppLifecycle} from 'react-native-applifecycle'
import Logo from '@/modules/home/assets/icons/logo.svg'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

/**
 * Component that displays an alternative screen when the app is moved to the background and the is visible in the iOS app switcher. Sadly does not work for Android.
 */
export const AppSwitcher = () => {
  const currentLifecycle = useAppLifecycle()
  const styles = useThemable(createStyles)

  if (currentLifecycle === 'background' || currentLifecycle === 'inactive') {
    return (
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <Logo fill="white" />
      </View>
    )
  }

  return null
}

const createStyles = ({z, color}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.background.appSwitcher,
      zIndex: z.appSwitcher,
      padding: '30%',
    },
  })
