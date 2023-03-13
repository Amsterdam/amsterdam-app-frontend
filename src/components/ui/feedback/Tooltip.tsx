import {AccessibilityProps, StyleSheet} from 'react-native'
import {SingleSelectable} from '@/components/ui/containers'
import {Triangle} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {Placement, TestID} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils'
import {Theme, useThemable} from '@/themes'

type Props = {
  placement: Placement
  testID?: TestID
  text: string | string[]
} & Pick<AccessibilityProps, 'accessibilityLabel'>

const TooltipContent = ({
  accessibilityLabel,
  testID,
  text,
}: Pick<Props, 'accessibilityLabel' | 'testID' | 'text'>) => {
  const styles = useThemable(createStyles)
  const paragraphs = typeof text === 'string' ? [text] : text

  return (
    <SingleSelectable style={styles.tooltip} {...{accessibilityLabel, testID}}>
      <Column gutter="sm">
        {paragraphs.map((paragraph, index) => (
          <Paragraph
            color="inverse"
            key={paragraph}
            testID={index === 0 ? [testID, 'Paragraph'].join('') : undefined}
            variant="small">
            {paragraph}
          </Paragraph>
        ))}
      </Column>
    </SingleSelectable>
  )
}

export const Tooltip = ({
  accessibilityLabel,
  placement,
  testID,
  text,
}: Props) => {
  const props = {direction: mapPlacementToDirection(placement)}

  return (
    <Row>
      {placement === Placement.after && <Triangle {...props} />}
      <Column>
        {placement === Placement.below && <Triangle {...props} />}
        <TooltipContent {...{accessibilityLabel, testID, text}} />
        {placement === Placement.above && <Triangle {...props} />}
      </Column>
      {placement === Placement.before && <Triangle {...props} />}
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
