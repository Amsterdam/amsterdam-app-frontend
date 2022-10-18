import React, {ReactNode} from 'react'
import {Row} from '@/components/ui/layout'
import {Icon, IconName} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'

type Props = {
  /**
   * Allows a custom visualization for the trait.
   * Use a small component here. Not rendered if an icon name is provided.
   */
  children?: ReactNode
  /**
   * The name of the icon to visually support the trait label.
   */
  iconName?: IconName
  /**
   * The label identifying the trait.
   * Should be one or a few words.
   */
  label: string
}

export const Trait = ({children, iconName, label}: Props) => (
  <Row gutter="sm" valign="center">
    {iconName ? <Icon name={iconName} /> : children}
    <Phrase variant="small">{label}</Phrase>
  </Row>
)
