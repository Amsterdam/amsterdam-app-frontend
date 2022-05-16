import React from 'react'
import {View} from 'react-native'
import {Logo} from '../../../assets/icons'

export const HeaderLogo = () => (
  <View
    accessible
    accessibilityRole="header"
    accessibilityLabel="Gemeente Amsterdam">
    <Logo width={85} />
  </View>
)
