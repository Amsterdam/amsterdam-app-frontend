import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {modules} from '../../modules'
import {module as homeModule} from '../../modules/home'

const moduleStacknames = modules.map(module => module.name)

export type RootStackParamList = Record<
  typeof moduleStacknames[number],
  undefined
>

const Stack = createStackNavigator<RootStackParamList>()

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={homeModule.name}
      screenOptions={{
        headerShown: false,
      }}>
      {modules.map(module => (
        <Stack.Screen
          component={module.stack}
          key={module.name}
          name={module.name}
        />
      ))}
    </Stack.Navigator>
  )
}
