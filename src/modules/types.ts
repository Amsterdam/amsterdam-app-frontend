import {Slice} from '@reduxjs/toolkit'
import {ComponentType} from 'react'

export type ClientModule = {
  linking: Record<string, string>
  name: string
  stack: ComponentType<any>
  slug: string
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

export type Module = ClientModule & ServerModule
