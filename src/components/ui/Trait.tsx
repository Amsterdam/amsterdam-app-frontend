import React, {ReactNode} from 'react'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'

type Props = {
  /**
   * Allows a custom visualisation for the trait.
   * Use a small component here.
   */
  children?: ReactNode
  /**
   * The icon to visually support the trait label.
   * Use either an icon or a child component.
   */
  icon?: ReactNode
  /**
   * The label identifying the trait.
   * Should be one or a few words.
   */
  label: string
}

export const Trait = ({children, icon, label}: Props) => (
  <Row gutter="sm" valign="center">
    {icon && <Icon size={16}>{icon}</Icon>}
    {children}
    <Phrase variant="small">{label}</Phrase>
  </Row>
)
