import {StackNavigationOptions} from '@react-navigation/stack'
import {ComponentType} from 'react'

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
