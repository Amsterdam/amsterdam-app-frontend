import React, {SVGProps} from 'react'
import {ChevronLeft, ChevronRight} from '@/assets/icons'
import {Pressable} from '@/components/ui/buttons'
import {Row, Size} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text/Phrase'
import {Direction} from '@/components/ui/types'
import {Theme, useThemable, useTheme} from '@/themes'

type Props = {
  label: string
  onPress: () => void
  variant?: 'backward' | 'default' | 'forward'
}

type LinkIconProps = {
  direction: Direction.left | Direction.right
}

const LinkIcon = ({direction}: LinkIconProps) => {
  const ChevronIcon = direction === Direction.left ? ChevronLeft : ChevronRight
  const iconProps = useThemable(createIconProps)
  const {text} = useTheme()

  return (
    <Size height={1.4 * text.fontSize.body}>
      <Icon>
        <ChevronIcon {...iconProps} />
      </Icon>
    </Size>
  )
}

export const Link = ({label, onPress, variant = 'default'}: Props) => {
  const {text} = useTheme()

  return (
    <Pressable hitSlop={(48 - 1.4 * text.fontSize.body) / 2} onPress={onPress}>
      <Row gutter="xs">
        {variant === 'backward' && <LinkIcon direction={Direction.left} />}
        {variant === 'default' && <LinkIcon direction={Direction.right} />}
        <Phrase color="link">{label}</Phrase>
        {variant === 'forward' && <LinkIcon direction={Direction.right} />}
      </Row>
    </Pressable>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
