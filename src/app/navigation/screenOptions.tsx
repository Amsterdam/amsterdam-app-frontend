import {StackNavigationOptions} from '@react-navigation/stack'
import {StatusBar} from 'react-native'
import {Header} from '@/components/features/header/Header'
import {Theme} from '@/themes/themes'

export type CustomScreenOptions = {
  /**
   * Determines if the card should be placed below the status bar
   */
  isBelowStatusBar?: boolean
  screenType?: keyof Theme['color']['screen']['background']
}

export const screenOptions: (
  theme: Theme,
  options?: CustomScreenOptions,
) => StackNavigationOptions = (
  {color}: Theme,
  {screenType = 'default', isBelowStatusBar = false}: CustomScreenOptions = {},
): StackNavigationOptions => {
  const backgroundColor = color.screen.background[screenType]

  return {
    cardStyle: {
      backgroundColor,
      paddingTop: isBelowStatusBar ? StatusBar.currentHeight : undefined,
    },
    header: props => (
      <Header
        {...props}
        backgroundColor={backgroundColor}
      />
    ),
    headerMode: 'screen',
  }
}
