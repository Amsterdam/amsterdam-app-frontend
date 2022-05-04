import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {modules} from '../../modules'
import {module as homeModule} from '../../modules/home'

const Stack = createStackNavigator()

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={homeModule.name}
      screenOptions={{
        headerShown: false,
      }}>
      {modules.map(module => (
        <Stack.Screen component={module.stack} name={module.name} />
      ))}
    </Stack.Navigator>
  )
}
