import React, {ReactNode} from 'react'
import {Row} from './layout'
import {Icon} from './media'
import {Phrase} from './text'

type Props = {
  icon: ReactNode
  label: string
}

export const Trait = ({icon, label}: Props) => (
  <Row gutter="sm" valign="center">
    <Icon size={16}>{icon}</Icon>
    <Phrase variant="small">{label}</Phrase>
  </Row>
)
