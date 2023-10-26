import {
  ElementRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react'
import {AccessibilityProps, StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
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
  onChange: (isOpen: boolean) => void
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
      accessibilityRole="text"
      accessible={true}
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

type TooltipRefProps = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  onToggle: () => void
}

export const Tooltip = forwardRef<TooltipRefProps, Props>(
  ({accessibilityLabel, placement, testID, text, onChange}, ref) => {
    const props = {direction: mapPlacementToDirection(placement)}
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useImperativeHandle(
      ref,
      () => ({
        onOpen: () => setIsOpen(true),
        onToggle: () => setIsOpen(prev => !prev),
        onClose: () => setIsOpen(false),
        isOpen,
      }),
      [isOpen],
    )

    useEffect(() => {
      onChange(isOpen)
    }, [isOpen, onChange])

    return (
      isOpen && (
        <Pressable
          insetHorizontal="lg"
          onPress={() => setIsOpen(false)}>
          <Row>
            {placement === Placement.after && <Triangle {...props} />}
            <Column>
              {placement === Placement.below && <Triangle {...props} />}
              <View>
                <TooltipContent
                  accessibilityLabel={accessibilityLabel}
                  testID={testID}
                  text={text}
                />
              </View>
              {placement === Placement.above && <Triangle {...props} />}
            </Column>
            {placement === Placement.before && <Triangle {...props} />}
          </Row>
        </Pressable>
      )
    )
  },
)

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    tooltip: {
      padding: size.spacing.md,
      backgroundColor: color.background.inverse,
    },
  })

export type Tooltip = ElementRef<typeof Tooltip>
