import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Paragraph} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = {
  text: string
}

export const Tooltip = ({text}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.tooltip}>
      <Paragraph color="inverse" variant="small">
        {text}
      </Paragraph>
    </View>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    tooltip: {
      padding: size.spacing.md,
      backgroundColor: color.background.inverse,
    },
  })
