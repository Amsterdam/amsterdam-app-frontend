import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {UserScreen} from './Screen'
import {userRoutes} from './routes'

const Stack = createStackNavigator()

export const UserStack = () => {
  const {theme} = useContext(ThemeContext)
  const {user} = userRoutes

  return (
    <Stack.Navigator
      initialRouteName={user.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={UserScreen}
        name={user.name}
        options={user.options}
      />
    </Stack.Navigator>
  )
}
