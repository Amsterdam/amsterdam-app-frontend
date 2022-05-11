import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {UserScreen} from './Screen'
import {userRoutes} from './routes'

const Stack = createStackNavigator()

export const UserStack = () => {
  const {user} = userRoutes
  return (
    <Stack.Navigator
      initialRouteName={user.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={UserScreen}
        name={user.name}
        options={user.options}
      />
    </Stack.Navigator>
  )
}
