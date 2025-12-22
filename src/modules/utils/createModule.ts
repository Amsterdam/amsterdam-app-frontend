import type {SvgIconConfig} from '@/components/ui/media/svgIcons'
import type {CoreModuleConfig, ModuleClientConfig} from '@/modules/types'

export const createClientModule = <
  PushNotificationData extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  Icons extends Record<string, SvgIconConfig> | void = void,
>(
  module: ModuleClientConfig<PushNotificationData, Icons>,
) => module

export const createCoreModule = (module: CoreModuleConfig) => module
