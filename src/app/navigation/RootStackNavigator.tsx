import {ParamListBase} from '@react-navigation/core'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {clientModules} from '@/modules'
import {module as homeModule} from '@/modules/home'
import {ModuleSlug} from '@/modules/slugs'
import {
  getModuleStack,
  ModalParams,
  modals,
  ModuleStackParams,
} from '@/modules/stacks'
import {useTheme} from '@/themes'

type ModuleParams<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = Extract<keyof ParamList, string>,
> = Record<
  ModuleSlug,
  | undefined
  | {screen?: RouteName}
  | {screen: RouteName; params: ParamList[RouteName]}
>

export type RootStackParams = ModuleParams<ModuleStackParams> &
  ModuleStackParams &
  ModalParams

const Stack = createStackNavigator<RootStackParams>()

export const RootStackNavigator = () => {
  const theme = useTheme()
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
      <Stack.Group
        screenOptions={{presentation: 'modal', ...screenOptions(theme)}}>
        {Object.entries(modals).map(([key, route]) => (
          <Stack.Screen key={key} {...route} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
