import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size} from '../../tokens'

type CardProps = {
  border?: Boolean
  children: React.ReactNode
}

type CardBodyProps = {
  children: React.ReactNode
}

type CardHeaderProps = {
  children: React.ReactNode
}

export const Card = ({border = false, children}: CardProps) => (
  <View style={[styles.card, border && styles.cardBorder]}>{children}</View>
)

export const CardHeader = ({children}: CardHeaderProps) => (
  <View style={styles.cardHeader}>{children}</View>
)

export const CardBody = ({children}: CardBodyProps) => (
  <View style={styles.cardBody}>{children}</View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.background.white,
    flexGrow: 1,
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: color.border.default,
  },
  cardBody: {
    padding: size.spacing.md,
  },
  cardHeader: {
    paddingHorizontal: size.spacing.md,
    paddingVertical: size.spacing.sm,
    borderBottomColor: color.border.default,
    borderBottomWidth: 1,
  },
})
