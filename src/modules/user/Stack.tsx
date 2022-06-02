import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes'
import {UserRouteName, userRoutes} from './routes'
import {UserScreen} from './screens'

const Stack = createStackNavigator()

export const UserStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={UserRouteName.home}
      screenOptions={screenOptions(theme, {
        screenType: 'settings',
      })}>
      <Stack.Screen
        component={UserScreen}
        name={UserRouteName.home}
        options={userRoutes.Home}
      />
    </Stack.Navigator>
  )
}
