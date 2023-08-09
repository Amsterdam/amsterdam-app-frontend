import {NavigationProp, ParamListBase, RouteProp} from '@react-navigation/core'
import {
  StackNavigationOptions,
  StackNavigationProp as StackNavigationPropOriginal,
} from '@react-navigation/stack'
import {ComponentType} from 'react'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleStackParams, ModalParams} from '@/modules/stacks'

type ModuleParams<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = Extract<keyof ParamList, string>,
> = Record<
  ModuleSlug,
  | undefined
  | {screen?: RouteName}
  | {params: ParamList[RouteName]; screen: RouteName}
>

export type RootStackParams = ModuleParams<ModuleStackParams> &
  ModuleStackParams &
  ModalParams

export type StackNavigationProp<RouteName extends keyof RootStackParams> =
  StackNavigationPropOriginal<RootStackParams, RouteName>

export type NavigationProps<RouteName extends keyof RootStackParams> = {
  navigation: NavigationProp<RootStackParams, RouteName>
  route: RouteProp<Pick<RootStackParams, RouteName>>
}

export type StackNavigationRoutes<R, Route extends string = string> = Record<
  Route,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<any>
    name: keyof R
    options?: StackNavigationOptions & {
      accessibilityLanguage?: string
    }
    requiresAuthorization?: boolean
    title?: string
  }
>
