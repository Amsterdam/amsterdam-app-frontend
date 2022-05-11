import {Slice} from '@reduxjs/toolkit'
import {ComponentType} from 'react'

export type ClientModule = {
  linking: Record<string, string>
  name: string
  slug: string
  stack: ComponentType<any>
  state: Slice[]
}

export type ServerModule = {
  description: string
  icon: string
  slug: string
  status: number
  title: string
  version: string
}

export type CombinedModule = ClientModule & ServerModule

export type SupportiveModule = {
  name: string
  stack: ComponentType<any>
  state: Slice[]
  title: string
}
