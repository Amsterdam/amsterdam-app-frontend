import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color} from '../../tokens'

export const Divider = () => <View style={styles.line} />

const styles = StyleSheet.create({
  line: {
    borderBottomColor: color.border.divider,
    borderBottomWidth: 1,
  },
})
