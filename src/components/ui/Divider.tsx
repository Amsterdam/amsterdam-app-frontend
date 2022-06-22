import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '@/themes'

export const Divider = () => {
  const styles = useThemable(createStyles)

  return <View style={styles.line} />
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    line: {
      borderBottomColor: color.border.divider,
      borderBottomWidth: 1,
    },
  })
