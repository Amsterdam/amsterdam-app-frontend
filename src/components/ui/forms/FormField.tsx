import {ReactNode} from 'react'
import {HideFromAccessibility} from '@/components/ui/containers/HideFromAccessibility'
import {Row} from '@/components/ui/layout/Row'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {layoutStyles} from '@/styles/layoutStyles'

type Props = {
  children: ReactNode
  label: ReactNode
  labelPosition?: MainAxisPosition
}

const Label = ({children}: {children: ReactNode}) => (
  <HideFromAccessibility style={[layoutStyles.grow, layoutStyles.shrink]}>
    {children}
  </HideFromAccessibility>
)

export const FormField = ({
  children,
  label,
  labelPosition = 'start',
}: Props) => {
  const labelComponent = <Label>{label}</Label>

  return (
    <Row
      gutter="md"
      valign="center">
      {labelPosition === 'start' && labelComponent}
      {children}
      {labelPosition === 'end' && labelComponent}
    </Row>
  )
}
