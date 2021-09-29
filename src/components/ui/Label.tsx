import React from 'react'
import {View} from 'react-native'
import {Title} from '.'

type Props = {
  isAccessible: boolean | undefined
  text: string
}

export const Label = ({isAccessible, text}: Props) => {
  return (
    <View
      accessibilityElementsHidden={!isAccessible} // in case of iOS
      importantForAccessibility={!isAccessible ? 'no-hide-descendants' : 'auto'} // in case of Android
    >
      <Title level={4} text={text} />
    </View>
  )
}
