import React, {SVGProps} from 'react'
import {PressableProps} from 'react-native'
import {Location} from '@/assets/icons'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = {
  label: string
} & PressableProps

export const SuggestionButton = ({label, onPress}: Props) => {
  const iconProps = useThemable(createIconProps)

  return (
    <Pressable accessibilityRole="button" insetVertical="md" onPress={onPress}>
      <Row gutter="sm">
        <Icon size={24}>
          <Location {...iconProps} />
        </Icon>
        <Phrase color="link" ellipsizeMode="tail" numberOfLines={1}>
          {label}
        </Phrase>
      </Row>
    </Pressable>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
