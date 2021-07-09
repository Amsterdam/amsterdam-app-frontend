import React from 'react'
import {StyleSheet, View} from 'react-native'

type CardProps = {
  children: React.ReactNode
}

type CardBodyProps = CardProps

export const Card = ({children}: CardProps) => (
  <View style={styles.card}>{children}</View>
)

export const CardBody = ({children}: CardBodyProps) => (
  <View style={styles.cardBody}>{children}</View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  cardBody: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
})