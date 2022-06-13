import {StackNavigationOptions} from '@react-navigation/stack'
import {Header} from '_modules/home/components'
import {Theme} from '_themes/index'
import React from 'react'

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
      <Header {...props} screenType={customOptions.screenType} />
    ),
    headerMode: 'screen',
  }
}
