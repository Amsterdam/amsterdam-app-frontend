import {Slice} from '@reduxjs/toolkit'
import {ComponentType} from 'react'

export type Module = {
  linking: Record<string, string>
  name: string
  stack: ComponentType<any>
  state: Slice[]
}
