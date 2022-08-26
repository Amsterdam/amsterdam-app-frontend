import React from 'react'
import {PressableProps} from 'react-native'
import {Location} from '@/assets/icons'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'
import {useTheme} from '@/themes'

type Props = {
  label: string
} & PressableProps

export const SuggestionButton = ({label, onPress}: Props) => {
  const {color} = useTheme()

  return (
    <Pressable accessibilityRole="button" insetVertical="md" onPress={onPress}>
      <Row gutter="sm">
        <Icon size={24}>
          <Location fill={color.text.link} />
        </Icon>
        <Phrase color="link" ellipsizeMode="tail" numberOfLines={1}>
          {label}
        </Phrase>
      </Row>
    </Pressable>
  )
}
