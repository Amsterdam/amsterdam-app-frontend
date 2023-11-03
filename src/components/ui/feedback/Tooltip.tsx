import {ElementRef} from 'react'
import {AccessibilityProps, StyleSheet} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Placement, TestProps} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils/mapPlacementToDirection'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  isOpen: boolean
  onPress: () => void
  placement: Placement
  text: string | string[]
} & Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityLanguage'> &
  TestProps

const TooltipContent = ({testID, text}: Pick<Props, 'testID' | 'text'>) => {
  const styles = useThemable(createStyles)
  const paragraphs = typeof text === 'string' ? [text] : text

  return (
    <SingleSelectable
      accessibilityRole="text"
      accessible={false}
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
  accessibilityLanguage = 'nl-NL',
  isOpen,
  placement,
  testID,
  text,
  onPress,
}: Props) => {
  const props = {direction: mapPlacementToDirection(placement)}
  const setAccessibilityFocus = useAccessibilityFocus()

  if (!isOpen) {
    return null
  }

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityLanguage={accessibilityLanguage}
      insetHorizontal="lg"
      onPress={onPress}
      ref={setAccessibilityFocus}>
      <Row>
        {placement === Placement.after && <Triangle {...props} />}
        <Column>
          {placement === Placement.below && <Triangle {...props} />}
          <TooltipContent
            testID={testID}
            text={text}
          />
          {placement === Placement.above && <Triangle {...props} />}
        </Column>
        {placement === Placement.before && <Triangle {...props} />}
      </Row>
    </Pressable>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    tooltip: {
      padding: size.spacing.md,
      backgroundColor: color.background.inverse,
    },
  })

export type Tooltip = ElementRef<typeof Tooltip>
