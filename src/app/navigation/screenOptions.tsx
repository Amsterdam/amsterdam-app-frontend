import {StackNavigationOptions} from '@react-navigation/stack'
import {StatusBar} from 'react-native'
import {Header} from '@/modules/home/components'
import {Theme} from '@/themes'

export type CustomScreenOptions = {
  screenType?: keyof Theme['color']['screen']['background']
  isBelowStatusBar?: boolean
}

export const screenOptions: (
  theme: Theme,
  options?: CustomScreenOptions,
) => StackNavigationOptions = (
  {color}: Theme,
  {screenType = 'default', isBelowStatusBar = false}: CustomScreenOptions = {},
): StackNavigationOptions => ({
  cardStyle: {
    backgroundColor: color.screen.background[screenType],
    paddingTop: isBelowStatusBar ? StatusBar.currentHeight : undefined,
  },
  header: Header,
  headerMode: 'screen',
})

