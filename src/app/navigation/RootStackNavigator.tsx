import {ParamListBase} from '@react-navigation/core'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useMemo} from 'react'
import {Platform} from 'react-native'
import {screenOptions} from '@/app/navigation'
import {useModules} from '@/hooks'
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
  const {clientModules, userDisabledModulesBySlug} = useModules()

  const ModuleStacks = useMemo(
    () =>
      clientModules.map(({slug}) => {
        const stack = getModuleStack(slug)

        return stack ? (
          <Stack.Screen component={stack} key={slug} name={slug} />
        ) : null
      }),
    [clientModules],
  )

  return (
    <Stack.Navigator
      initialRouteName={
        userDisabledModulesBySlug.includes(ModuleSlug.welcome)
          ? ModuleSlug.home
          : ModuleSlug.welcome
      }
      screenOptions={{
        headerShown: false,
      }}>
      {ModuleStacks}
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          ...screenOptions(theme, {
            isBelowStatusBar: Platform.OS === 'android',
          }),
        }}>
        {Object.entries(modals).map(([key, route]) => (
          <Stack.Screen key={key} {...route} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
