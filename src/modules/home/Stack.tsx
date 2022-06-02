import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {HomeRouteName, homeRoutes} from './routes'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={HomeRouteName.home}
      screenOptions={screenOptions(theme)}>
      {Object.entries(homeRoutes).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={
            route.name === HomeRouteName.settings
              ? {
                  ...screenOptions(theme, {screenType: 'settings'}),
                  ...route.options,
                }
              : route.options
          }
        />
      ))}
    </Stack.Navigator>
  )
}
