import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'

export type StackNavigationRoutes<R, Route extends string = string> = Record<
  Route,
  {
    component: React.ComponentType<any>
    name: keyof R
    options?: StackNavigationOptions
    title?: string
  }
>
