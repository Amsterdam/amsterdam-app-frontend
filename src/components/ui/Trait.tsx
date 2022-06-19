import React, {ReactNode} from 'react'
import {Row} from './layout'
import {Icon} from './media'
import {Paragraph} from './text'

type Props = {
  icon: ReactNode
  label: string
}

export const Trait = ({icon, label}: Props) => (
  <Row gutter="xs" valign="center">
    <Icon size={16}>{icon}</Icon>
    <Paragraph variant="small">{label}</Paragraph>
  </Row>
)
