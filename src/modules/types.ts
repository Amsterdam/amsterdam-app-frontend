import {StackNavigationOptions} from '@react-navigation/stack'
import {Slice} from '@reduxjs/toolkit'
import {ElementType} from 'react'
import {IconName} from '@/components/ui/media'
import {ModuleSlug} from '@/modules/slugs'

/**
 * The client part of a module’s configuration.
 */
export type ModuleClientConfig = {
  BadgeValue?: ElementType
  hiddenInMenu?: boolean
  isCore?: boolean
  isForEmployees?: boolean
  linking: Record<string, string>
  name: string
  requiresFirebaseToken?: boolean
  screenOptions?: StackNavigationOptions
  slug: ModuleSlug
  state: Slice[]
}

/**
 * The server part of a module’s configuration.
 */
export type ModuleServerConfig = {
  description: string
  icon: IconName | 'projects'
  moduleSlug: ModuleSlug
  status: ModuleStatus
  title: string
  version: string
}

export enum ModuleStatus {
  active = 1,
  inactive = 0,
}

export type Module = ModuleServerConfig & ModuleClientConfig
