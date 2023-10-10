import {ReactNode, useMemo} from 'react'
import {SkipInScreenReader} from '@/components/ui/containers/SkipInScreenReader'
import {Row} from '@/components/ui/layout/Row'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {layoutStyles} from '@/styles/layoutStyles'

type Props = {
  children: ReactNode
  label: ReactNode
  labelPosition?: MainAxisPosition
}

const Label = ({children}: {children: ReactNode}) => (
  <SkipInScreenReader style={[layoutStyles.grow, layoutStyles.shrink]}>
    {children}
  </SkipInScreenReader>
)

export const FormField = ({
  children,
  label,
  labelPosition = 'start',
}: Props) => {
  const labelComponent = useMemo(() => <Label>{label}</Label>, [label])

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
