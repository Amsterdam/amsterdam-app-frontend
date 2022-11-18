import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Logo} from '@/modules/home/assets/icons'

export const HeaderLogo = () => (
  <View
    accessibilityLabel="Gemeente Amsterdam"
    accessibilityRole="header"
    accessible
    style={styles.view}>
    <Logo />
  </View>
)

const styles = StyleSheet.create({
  view: {
    width: 115,
    height: 40,
  },
})
