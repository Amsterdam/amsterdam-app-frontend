import {Column} from '_components/ui/layout'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Paragraph} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = {
  text: string | string[]
}

export const Tooltip = ({text}: Props) => {
  const styles = useThemable(createStyles)
  const paragraphs = typeof text === 'string' ? [text] : text

  return (
    <View style={styles.tooltip}>
      <Column gutter="sm">
        {paragraphs.map(paragraph => (
          <Paragraph color="inverse" variant="small" key={paragraph}>
            {paragraph}
          </Paragraph>
        ))}
      </Column>
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
