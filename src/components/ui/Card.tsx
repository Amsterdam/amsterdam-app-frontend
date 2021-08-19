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

type CardHeaderProps = {
  children: React.ReactNode
}

export const Card = ({children}: CardProps) => (
  <View style={styles.card}>{children}</View>
)

export const CardHeader = ({children}: CardHeaderProps) => (
  <View style={styles.cardHeader}>{children}</View>
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
    paddingHorizontal: size.spacing.md,
    paddingVertical: size.spacing.sm,
  },
  cardHeader: {
    paddingHorizontal: size.spacing.md,
    paddingVertical: size.spacing.sm,
    borderBottomColor: color.background.light,
    borderBottomWidth: 1,
  },
  center: {
    paddingHorizontal: size.spacing.md,
    paddingVertical: size.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
