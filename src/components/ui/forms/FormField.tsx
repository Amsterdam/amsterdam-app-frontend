import React, {ReactNode} from 'react'
import {SkipInScreenReader} from '@/components/ui/containers/SkipInScreenReader'
import {MainAxisPosition, Row} from '@/components/ui/layout'
import {layoutStyles} from '@/styles'

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
}: Props) => (
  <Row gutter="md" valign="center">
    {labelPosition === 'start' && <Label children={label} />}
    {children}
    {labelPosition === 'end' && <Label children={label} />}
  </Row>
)
