import {Slice} from '@reduxjs/toolkit'

/**
 * The client part of a module’s configuration.
 */
export type ModuleClientConfig = {
  isCore?: boolean
  linking: Record<string, string>
  name: string
  slug: string
  state: Slice[]
}

/**
 * The server part of a module’s configuration.
 */
export type ModuleServerConfig = {
  description: string
  icon: string
  slug: string
  status: number
  title: string
  version: string
}

export type Module = ModuleServerConfig & ModuleClientConfig
