import {Slice} from '@reduxjs/toolkit'
import {ModuleSlug} from './slugs'

/**
 * The client part of a module’s configuration.
 */
export type ModuleClientConfig = {
  isCore?: boolean
  isForEmployees?: boolean
  linking: Record<string, string>
  name: string
  slug: ModuleSlug
  state: Slice[]
}

/**
 * The server part of a module’s configuration.
 */
export type ModuleServerConfig = {
  description: string
  icon: string
  slug: ModuleSlug
  status: number
  title: string
  version: string
}

export type Module = ModuleServerConfig & ModuleClientConfig
