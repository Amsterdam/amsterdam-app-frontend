import {Slice} from '@reduxjs/toolkit'
import {ComponentType} from 'react'

export type Module = {
  label: string
  linking: Record<string, string>
  name: string
  stack: ComponentType<any>
  state: Slice[]
}
