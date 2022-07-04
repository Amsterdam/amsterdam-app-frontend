import {StackNavigationOptions} from '@react-navigation/stack'
import {Header} from '@/modules/home/components'
import {Theme} from '@/themes'

export type CustomScreenOptions = {
  screenType: keyof Theme['color']['screen']['background']
}

const defaultOptions: CustomScreenOptions = {
  screenType: 'default',
}

export const screenOptions: (
  theme: Theme,
  options?: CustomScreenOptions,
) => StackNavigationOptions = ({color}, options) => {
  const customOptions = {...defaultOptions, ...options}

  return {
    cardStyle: {
      backgroundColor: color.screen.background[customOptions.screenType],
    },
    header: Header,
    headerMode: 'screen',
  }
}
