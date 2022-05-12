import {Slice} from '@reduxjs/toolkit'
import {ComponentType} from 'react'

export type ClientModule = {
  isCore?: boolean
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

export type Module = ClientModule & ServerModule
