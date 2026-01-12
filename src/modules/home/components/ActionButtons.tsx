import {Row} from '@/components/ui/layout/Row'
import {useModules} from '@/hooks/useModules'
import {actionButtons} from '@/modules/generated/actionButtons.generated'
import {mergeComponentsWithEnabledModules} from '@/utils/mergeComponentsWithEnabledModules'

/**
 * The ActionButtons on the home screen that leads to an action within the module.
 */
export const ActionButtons = () => {
  const {enabledModules} = useModules()

  const ActionButtonsComponents = mergeComponentsWithEnabledModules(
    actionButtons,
    enabledModules,
  )

  if (!ActionButtonsComponents.length) {
    return null
  }

  return (
    <Row
      align="evenly"
      valign="start">
      {ActionButtonsComponents}
    </Row>
  )
}
