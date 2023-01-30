import {StackNavigationOptions} from '@react-navigation/stack'
import {ComponentType} from 'react'

export type StackNavigationRoutes<R, Route extends string = string> = Record<
  Route,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<any>
    isForEmployees?: boolean
    name: keyof R
    options?: StackNavigationOptions
    title?: string
  }
>
