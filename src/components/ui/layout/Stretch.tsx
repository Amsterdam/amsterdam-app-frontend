import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'

type Props = {
  children: ReactNode
}

export const Stretch = ({children}: Props) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
