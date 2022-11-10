import {StackNavigationOptions} from '@react-navigation/stack'
import {StatusBar} from 'react-native'
import {Header} from '@/modules/home/components'
import {Theme} from '@/themes'

export type CustomScreenOptions = {
  screenType?: keyof Theme['color']['screen']['background']
  isModal?: boolean
}

const defaultOptions: CustomScreenOptions = {
  screenType: 'default',
  isModal: false,
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
      paddingTop: customOptions.isModal ? StatusBar.currentHeight : undefined,
    },
    header: Header,
    headerMode: 'screen',
  }
}
