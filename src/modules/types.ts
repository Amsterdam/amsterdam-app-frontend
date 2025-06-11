import {type EventDetail, type EventType} from '@notifee/react-native'
import {type PathConfigMap} from '@react-navigation/core'
import {type StackNavigationOptions} from '@react-navigation/stack'
import {type ComponentType} from 'react'
import {type RootStackParams, type RouteProp} from '@/app/navigation/types'
import {type SvgIconName} from '@/components/ui/media/svgIcons'
import {type ReduxDispatch} from '@/hooks/redux/types'
import {type ModuleSlug} from '@/modules/slugs'
import {type CustomDimensionKeys} from '@/processes/piwik/types'
import {type ReduxConfig} from '@/store/types/reduxConfig'
import {type RootState} from '@/store/types/rootState'

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
  screenOptions?:
    | StackNavigationOptions
    | ((props: {
        navigation: unknown
        route: RouteProp<ModuleSlug>
      }) => StackNavigationOptions)
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
   * A button on the home screen that leads to an action within the module.
   */
  ActionButton?: ComponentType
  /**
   * A component to show in the header of the Home screen.
   */
  HeaderComponent?: ComponentType
  /**
   * Component to render after the module has been rendered.
   */
  PostRenderComponent?: ComponentType
  /**
   * A component for preprocessing purposes at the app's root level.
   * If `renderBeforeServerModules` is true, the component will be rendered before the server modules are fetched.
   */
  PreRenderComponent?: ComponentType & {
    renderBeforeServerModules?: boolean
  }
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
  linking?: PathConfigMap<RootStackParams>
  /**
   * Function to call the logout logic of the module.
   */
  logout?: (dispatch: ReduxDispatch, state: RootState) => Promise<void>
  /**
   * Module specific logic for handling notification events
   * @param type Interaction type with the notification, for example Press or Delivered
   * @param detail details of the event
   * @param dispatch Redux dispatch function
   */
  onNotificationEvent?: (
    type: EventType,
    detail: EventDetail,
    dispatch: ReduxDispatch,
  ) => void
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
  icon: SvgIconName
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
