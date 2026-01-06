import {Row} from '@/components/ui/layout/Row'
import {useModules} from '@/hooks/useModules'

export const ActionButtons = () => {
  const {enabledModules} = useModules()

  const isActionButton = enabledModules?.some(
    ({ActionButton}) => !!ActionButton,
  )

  if (!isActionButton) {
    return null
  }

  return (
    <Row
      align="evenly"
      valign="start">
      {enabledModules?.map(
        ({ActionButton, slug}) => ActionButton && <ActionButton key={slug} />,
      ) ?? null}
    </Row>
  )
}
