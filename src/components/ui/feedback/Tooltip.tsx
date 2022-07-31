import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {Placement} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils'
import {Theme, useThemable} from '@/themes'

type Props = {
  placement: Placement
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

export const Tooltip = ({placement, text}: Props) => {
  const props = {direction: mapPlacementToDirection(placement)}

  return (
    <Row>
      {placement === Placement.end && <Triangle {...props} />}
      <Column>
        {placement === Placement.bottom && <Triangle {...props} />}
        <TooltipContent text={text} />
        {placement === Placement.top && <Triangle {...props} />}
      </Column>
      {placement === Placement.start && <Triangle {...props} />}
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
