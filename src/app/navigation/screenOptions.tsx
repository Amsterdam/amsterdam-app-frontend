import {StackNavigationOptions} from '@react-navigation/stack'
import {StatusBar} from 'react-native'
import {Header} from '@/modules/home/components'
import {Theme} from '@/themes'

export type CustomScreenOptions = {
  screenType?: keyof Theme['color']['screen']['background']
  isBelowStatusBar?: boolean
}

const defaultOptions: CustomScreenOptions = {
  screenType: 'default',
  isBelowStatusBar: false,
}

export const screenOptions: (
  theme: Theme,
  options?: CustomScreenOptions,
) => StackNavigationOptions = ({color}, options) => {
  const customOptions = {...defaultOptions, ...options}

  return {
    cardStyle: {
      backgroundColor: customOptions.screenType
        ? color.screen.background[customOptions.screenType]
        : undefined,
      paddingTop: customOptions.isBelowStatusBar
        ? StatusBar.currentHeight
        : undefined,
    },
    header: Header,
    headerMode: 'screen',
  }
}
