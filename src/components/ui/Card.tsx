import React from 'react'
import {StyleSheet, View} from 'react-native'

export type CardProps = {
  children: React.ReactNode
}

export const Card = ({children}: CardProps) => (
  <View style={styles.card}>{children}</View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
  },
})
