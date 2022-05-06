import {Slice} from '@reduxjs/toolkit'
import {ComponentType} from 'react'
import {HomeStack} from './Stack'

type Module = {
  linking: Record<string, string>
  name: string
  stack: ComponentType<any>
  state: Slice[]
}

export const module: Module = {
  linking: {},
  name: 'HomeModule',
  stack: HomeStack,
  state: [],
}
