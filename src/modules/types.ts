import {Slice} from '@reduxjs/toolkit'
import {ElementType} from 'react'
import {ModuleSlug} from '@/modules/slugs'

/**
 * The client part of a module’s configuration.
 */
export type ModuleClientConfig = {
  BadgeValue?: ElementType
  isCore?: boolean
  isForEmployees?: boolean
  linking: Record<string, string>
  name: string
  requiresFirebaseToken?: boolean
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
