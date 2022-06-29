import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {clientModules} from '@/modules'
import {module as homeModule} from '@/modules/home'
import {getModuleStack} from '@/modules/stacks'

const moduleNames = clientModules.map(module => module.name)

export type RootStackParamList = Record<typeof moduleNames[number], any>

const Stack = createStackNavigator<RootStackParamList>()

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={homeModule.name}
      screenOptions={{
        headerShown: false,
      }}>
      {clientModules.map(module => {
        const stack = getModuleStack(module.slug)
        return stack ? (
          <Stack.Screen
            component={stack}
            key={module.slug}
            name={module.name}
          />
        ) : null
      })}
    </Stack.Navigator>
  )
}
