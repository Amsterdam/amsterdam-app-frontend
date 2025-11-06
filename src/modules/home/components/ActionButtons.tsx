import {Row} from '@/components/ui/layout/Row'
import {useModules} from '@/hooks/useModules'
import {clientModules} from '@/modules/modules'

export const ActionButtons = () => {
  const {enabledModules} = useModules()

  const modulesWithPreRenderComponentBeforeServerModules = clientModules.filter(
    m => m.PreRenderComponent?.renderBeforeServerModules,
  )

  const modules =
    enabledModules ?? modulesWithPreRenderComponentBeforeServerModules

  const isActionButton = modules.some(({ActionButton}) => !!ActionButton)

  if (!isActionButton) {
    return null
  }

  return (
    <Row
      align="evenly"
      valign="start">
      {modules.map(
        ({ActionButton, slug}) => ActionButton && <ActionButton key={slug} />,
      )}
    </Row>
  )
}
