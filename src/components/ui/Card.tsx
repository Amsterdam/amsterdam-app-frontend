import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size} from '../../tokens'

type CardProps = {
  children: React.ReactNode
}

type CardBodyProps = {
  centerContent?: boolean
  children: React.ReactNode
  direction?: 'column' | 'row'
}

export const Card = ({children}: CardProps) => (
  <View style={styles.card}>{children}</View>
)

export const CardBody = ({
  children,
  direction = 'column',
  centerContent,
}: CardBodyProps) => (
  <View
    style={[
      styles.cardBody,
      styles[direction],
      centerContent && styles.center,
    ]}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.background.lighter,
    flexGrow: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cardBody: {
    padding: size.spacing.md,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
