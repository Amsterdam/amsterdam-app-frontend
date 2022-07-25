import React from 'react'
import {View} from 'react-native'
import {Paragraph} from '../text'

type Props = {
  isAccessible?: boolean
  text: string
}

export const Label = ({isAccessible, text}: Props) => {
  return (
    <View
      accessibilityElementsHidden={!isAccessible} // in case of iOS
      importantForAccessibility={!isAccessible ? 'no-hide-descendants' : 'auto'} // in case of Android
    >
      <Paragraph>{text}</Paragraph>
    </View>
  )
}
