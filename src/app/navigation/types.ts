import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'

export type StackNavigationRoutes<R, Route extends string = string> = Record<
  Route,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>
    name: keyof R
    options?: StackNavigationOptions
    title?: string
  }
>
