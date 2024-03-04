import {StackNavigationOptions} from '@react-navigation/stack'
import {ElementType} from 'react'
import {IconName} from '@/components/ui/media/iconPaths'
import {ModuleSlug} from '@/modules/slugs'
import {CustomDimensionKeys} from '@/processes/piwik/types'
import {ReduxConfig} from '@/store/types/reduxConfig'

/**
 * The config properties that are shared between core and non-core modules.
 */
type BaseModuleConfig = {
  /**
   * The log dimension to log the enabled state of this module
   */
  logDimension?: CustomDimensionKeys
  /**
   * The module’s route name.
   * @see https://reactnavigation.org/docs/stack-navigator/#api-definition
   */
  name?: string
  /**
   * Configuration used to initialize the Redux state
   */
  reduxConfigs?: ReduxConfig[]
  /**
   * The module’s screen options.
   * @see https://reactnavigation.org/docs/stack-navigator/#options
   */
  screenOptions?: StackNavigationOptions
  /**
   * A unique human-readable identifier for the module.
   */
  slug: ModuleSlug
}

/**
 * The complete configuration for a core module.
 */
export type CoreModuleConfig = BaseModuleConfig

/**
 * The client part of a non-core module’s configuration.
 */
export type ModuleClientConfig = BaseModuleConfig & {
  /**
   * A component for displaying a badge on the module’s button.
   */
  BadgeValue?: ElementType
  /**
   * A component for preprocessing purposes at the app's root level.
   */
  PreRenderComponent?: ElementType
  /**
   * If true, the user is not allowed to disable the module in the settings.
   */
  alwaysEnabled?: boolean
  /**
   * Determines whether the module should be hidden on the home screen.
   */
  hiddenInMenu?: boolean
  /**
   * The module's deeplink configuration.
   * @see https://reactnavigation.org/docs/configuring-links
   */
  linking?: Record<string, string>
  /**
   * Determines whether the module requires authorization to be accessed.
   */
  requiresAuthorization?: boolean
  /**
   * Determines whether the module requires a Firebase token.
   */
  requiresFirebaseToken?: boolean
}

/**
 * The server part of a module’s configuration.
 */
export type ModuleServerConfig = {
  description: string
  icon: IconName
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
