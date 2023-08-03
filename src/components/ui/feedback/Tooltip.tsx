import {AccessibilityProps, StyleSheet} from 'react-native'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Placement, TestProps} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils/mapPlacementToDirection'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  placement: Placement
  text: string | string[]
} & Pick<AccessibilityProps, 'accessibilityLabel'> &
  TestProps

const TooltipContent = ({
  accessibilityLabel,
  testID,
  text,
}: Pick<Props, 'accessibilityLabel' | 'testID' | 'text'>) => {
  const styles = useThemable(createStyles)
  const paragraphs = typeof text === 'string' ? [text] : text

  return (
    <SingleSelectable
      accessibilityLabel={accessibilityLabel}
      style={styles.tooltip}
      testID={testID}>
      <Column gutter="sm">
        {paragraphs.map((paragraph, index) => (
          <Paragraph
            color="inverse"
            key={paragraph}
            testID={testID && index === 0 ? `${testID}Paragraph` : undefined}
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
        <TooltipContent
          accessibilityLabel={accessibilityLabel}
          testID={testID}
          text={text}
        />
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
