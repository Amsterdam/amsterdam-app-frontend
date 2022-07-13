import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {TouchableOpacityProps} from 'react-native'
import {Text} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {useTheme} from '@/themes'

type Props = {
  label: string
} & TouchableOpacityProps

export const SuggestionButton = ({label, onPress}: Props) => {
  const {color} = useTheme()

  return (
    <Pressable accessibilityRole="button" insetVertical="md" onPress={onPress}>
      <Row gutter="xs">
        <Icon size={24}>
          <Location fill={color.text.tertiary} />
        </Icon>
        <Text large>{label}</Text>
      </Row>
    </Pressable>
  )
}
