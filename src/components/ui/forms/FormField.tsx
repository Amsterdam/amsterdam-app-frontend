import React, {ReactNode} from 'react'
import {layoutStyles} from '../../../styles'
import {SkipInScreenReader} from '../SkipInScreenReader'
import {Row} from '../layout'
import {MainAxisPosition} from '../layout/types'

type Props = {
  children: ReactNode
  label: ReactNode
  labelPosition?: MainAxisPosition
}

const Label = ({children}: {children: ReactNode}) => (
  <SkipInScreenReader style={layoutStyles.grow}>{children}</SkipInScreenReader>
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
