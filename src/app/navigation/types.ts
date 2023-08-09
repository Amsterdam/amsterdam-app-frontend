import {
  NavigationProp as NavigationPropOriginal,
  ParamListBase,
  RouteProp as RoutePropOriginal,
} from '@react-navigation/core'
import {StackNavigationOptions} from '@react-navigation/stack'
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

/**
 * NavigationProp is the type of a navigation object as part of NavigationProps or as returned by useNavigation.
 */
export type NavigationProp<RouteName extends keyof RootStackParams> =
  NavigationPropOriginal<RootStackParams, RouteName>

/**
 * RouteProp is the type of a navigation object as part of NavigationProps or as returned by useRoute.
 */
export type RouteProp<RouteName extends keyof RootStackParams> =
  RoutePropOriginal<RootStackParams, RouteName>

/**
 * NavigationProps contains a NavigationProp and a RouteProp. This can be used in screen components (i.e. components that receive these props because the are stack screens).
 */
export type NavigationProps<RouteName extends keyof RootStackParams> = {
  navigation: NavigationProp<RouteName>
  route: RouteProp<RouteName>
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
