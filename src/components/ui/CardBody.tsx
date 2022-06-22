import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: ReactNode
}

export const CardBody = ({children}: Props) => {
  const styles = useThemable(createStyles)

  return <View style={styles.cardBody}>{children}</View>
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    cardBody: {
      padding: size.spacing.md,
    },
  })
