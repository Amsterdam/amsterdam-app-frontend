import {useModules} from '@/hooks/useModules'
import {headerComponents} from '@/modules/generated/headerComponents.generated'
import {mergeComponentsWithEnabledModules} from '@/utils/mergeComponentsWithEnabledModules'

/**
 * The components to show in the header of the Home screen.
 */
export const ModuleHeaderComponents = () => {
  const {enabledModules} = useModules()

  return mergeComponentsWithEnabledModules(headerComponents, enabledModules)
}
