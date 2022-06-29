import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {clientModules} from '@/modules'
import {module as homeModule} from '@/modules/home'
import {ModuleSlugs} from '@/modules/slugs'
import {getModuleStack, ModuleStackParams} from '@/modules/stacks'

export type RootStackParamList = Record<ModuleSlugs, any> & ModuleStackParams

const Stack = createStackNavigator<RootStackParamList>()

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={homeModule.slug}
      screenOptions={{
        headerShown: false,
      }}>
      {clientModules.map(module => {
        const stack = getModuleStack(module.slug)
        return stack ? (
          <Stack.Screen
            component={stack}
            key={module.slug}
            name={module.slug}
          />
        ) : null
      })}
    </Stack.Navigator>
  )
}
