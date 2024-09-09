import {StackNavigationOptions} from '@react-navigation/stack'
import {StatusBar} from 'react-native'
import {Header} from '@/components/features/header/Header'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectIsBottomSheetPresentRouteNames} from '@/store/slices/bottomSheet'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'
export type CustomScreenOptions = {
  /**
   * Determines if the card should be placed below the status bar
   */
  isBelowStatusBar?: boolean
  isRoot?: boolean
  screenType?: keyof Theme['color']['screen']['background']
}

export const useScreenOptions = ({
  screenType = 'default',
  isBelowStatusBar = false,
}: CustomScreenOptions = {}): StackNavigationOptions => {
  const theme = useTheme()
  const isBottomSheetPresentRouteNames = useSelector(
    selectIsBottomSheetPresentRouteNames,
  )
  const backgroundColor = theme.color.screen.background[screenType]

  return {
    cardStyle: {
      backgroundColor,
      paddingTop: isBelowStatusBar ? StatusBar.currentHeight : undefined,
    },
    header: props =>
      isBottomSheetPresentRouteNames.includes(props.route.name) ? null : (
        <Header
          {...props}
          backgroundColor={backgroundColor}
        />
      ),
    headerMode: 'screen',
  }
}
