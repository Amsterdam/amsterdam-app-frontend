import {NavigationProp, RouteProp} from '@react-navigation/core'
import {StackNavigationOptions} from '@react-navigation/stack'
import {ComponentType} from 'react'
import {RootStackParams} from '@/app/navigation/RootStackNavigator'

export type NavigationProps<RouteName extends keyof RootStackParams> = {
  navigation: NavigationProp<RootStackParams>
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
