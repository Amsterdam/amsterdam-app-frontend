import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Direction, Triangle} from '@/components/ui/feedback/Triangle'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

type Props = {
  direction: Direction
  text: string | string[]
}

const TooltipContent = ({text}: Pick<Props, 'text'>) => {
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

export const Tooltip = ({direction, text}: Props) => {
  const props = {direction}

  return (
    <Row>
      {direction === 'back' && <Triangle {...props} />}
      <Column>
        {direction === 'up' && <Triangle {...props} />}
        <TooltipContent text={text} />
        {direction === 'down' && <Triangle {...props} />}
      </Column>
      {direction === 'forward' && <Triangle {...props} />}
    </Row>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    tooltip: {
      padding: size.spacing.md,
      backgroundColor: color.background.inverse,
    },
  })
