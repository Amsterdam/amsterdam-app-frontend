import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import {useMemo} from 'react'
import {StyleSheet, ViewStyle} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {
  HeaderContentOptions,
  NavigationProp,
  RootStackParams,
} from '@/app/navigation/types'
import {HideFromAccessibilityWhenInBackground} from '@/components/features/accessibility/HideFromAccessibilityWhenInBackground'
import {Box} from '@/components/ui/containers/Box'
import {HeaderContent} from '@/modules/home/components/HeaderContent'
import {HeaderContentForHome} from '@/modules/home/components/HeaderContentForHome'
import {HomeRouteName} from '@/modules/home/routes'

type BackgroundColorProp = {
  backgroundColor?: ViewStyle['backgroundColor']
}

export type HeaderProps = BackgroundColorProp &
  Pick<
    StackHeaderProps & {options: HeaderContentOptions},
    'options' | 'route'
  > & {
    back?: {onPress?: () => void} & Partial<StackHeaderProps['back']>
    navigation:
      | StackHeaderProps['navigation']
      | NavigationProp<keyof RootStackParams>
  }

export const Header = ({backgroundColor, ...rest}: HeaderProps) => {
  const {route} = rest
  const isHome = (route.name as HomeRouteName) === HomeRouteName.home

  const {top = 0, left = 0, right = 0} = useSafeAreaInsets()
  const styles = useMemo(
    () => createStyles({backgroundColor, top, left, right}),
    [backgroundColor, top, left, right],
  )

  return (
    <HideFromAccessibilityWhenInBackground style={styles.header}>
      <Box>
        {isHome ? <HeaderContentForHome /> : <HeaderContent {...rest} />}
      </Box>
    </HideFromAccessibilityWhenInBackground>
  )
}

const createStyles = ({
  top,
  left,
  right,
  backgroundColor,
}: Omit<EdgeInsets, 'bottom'> & BackgroundColorProp) =>
  StyleSheet.create({
    header: {
      paddingTop: top,
      paddingLeft: left,
      paddingRight: right,
      backgroundColor,
    },
  })
