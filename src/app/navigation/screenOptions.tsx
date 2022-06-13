import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'
import {Theme} from '../../themes'
import {AppHeader} from './AppHeader'

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
    header: props => (
      <AppHeader {...props} screenType={customOptions.screenType} />
    ),
    headerMode: 'screen',
  }
}
