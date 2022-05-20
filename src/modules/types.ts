import {Slice} from '@reduxjs/toolkit'
import {ComponentType} from 'react'

/**
 * The client part of module configuration.
 * @todo Rename to e.g.`ModuleClientData`
 */
export type ClientModule = {
  isCore?: boolean
  isSelected: boolean
  linking: Record<string, string>
  name: string
  slug: string
  stack: ComponentType<any>
  state: Slice[]
}

/**
 * The server part of module configuration.
 * @todo Rename to e.g. `ModuleServerData`
 */
export type ServerModule = {
  description: string
  icon: string
  slug: string
  status: number
  title: string
  version: string
}

/**
 * The user preferences part of module configuration.
 * @todo Rename to e.g.`ModuleUserData`
 */
export type ModulePreferences = {
  isSelected: boolean
}

export type Module = ClientModule & ServerModule & ModulePreferences
