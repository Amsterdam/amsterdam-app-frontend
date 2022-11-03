import React from 'react'
import {View} from 'react-native'
import {Paragraph} from '@/components/ui/text'

type Props = {
  isAccessible?: boolean
  text: string
}

export const Label = ({isAccessible, text}: Props) => (
  <View
    accessibilityElementsHidden={!isAccessible} // in case of iOS
    importantForAccessibility={!isAccessible ? 'no-hide-descendants' : 'auto'} // in case of Android
  >
    <Paragraph>{text}</Paragraph>
  </View>
)
