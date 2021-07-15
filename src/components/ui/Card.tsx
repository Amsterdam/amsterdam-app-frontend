import React from 'react'
import {StyleSheet, View} from 'react-native'
import {spacing} from '../../tokens'

type CardProps = {
  children: React.ReactNode
}

type CardBodyProps = {
  children: React.ReactNode
  direction?: 'column' | 'row'
}

export const Card = ({children}: CardProps) => (
  <View style={styles.card}>{children}</View>
)

export const CardBody = ({children, direction = 'column'}: CardBodyProps) => (
  <View style={[styles.cardBody, styles[direction]]}>{children}</View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cardBody: {
    padding: spacing.md,
  },
})
