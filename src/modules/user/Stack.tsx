import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes'
import {userRoutes} from './routes'
import {UserScreen} from './screens'

const Stack = createStackNavigator()

export const UserStack = () => {
  const {theme} = useSelector(selectTheme)
  const {user} = userRoutes

  return (
    <Stack.Navigator
      initialRouteName={user.name}
      screenOptions={screenOptions(theme, {
        screenType: 'settings',
      })}>
      <Stack.Screen
        component={UserScreen}
        name={user.name}
        options={user.options}
      />
    </Stack.Navigator>
  )
}
