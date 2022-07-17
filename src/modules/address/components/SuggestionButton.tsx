import React from 'react'
import {PressableProps} from 'react-native'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'

type Props = {
  label: string
} & PressableProps

export const SuggestionButton = ({label, onPress}: Props) => (
  <Pressable accessibilityRole="button" insetVertical="md" onPress={onPress}>
    <Row gutter="sm">
      <Icon color="link" name="location" size={24} />
      <Phrase color="link" ellipsizeMode="tail" numberOfLines={1}>
        {label}
      </Phrase>
    </Row>
  </Pressable>
)
