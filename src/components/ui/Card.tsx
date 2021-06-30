import React from 'react'
import {StyleSheet, View} from 'react-native'

export type CardProps = {
  children: React.ReactNode
}

const Card = ({children}: CardProps) => (
  <View style={styles.card}>{children}</View>
)

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
  },
})

export default Card
