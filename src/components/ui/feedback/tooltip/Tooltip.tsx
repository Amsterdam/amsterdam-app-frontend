import {ElementRef, useEffect, useRef} from 'react'
import {
  AccessibilityProps,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {TooltipContent} from '@/components/ui/feedback/tooltip/TooltipContent'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Placement, TestProps} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils/mapPlacementToDirection'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  defaultIsOpen?: boolean
  extraSpace?: keyof SpacingTokens
  isOpen: boolean
  onPress: () => void
  placement: Placement
  text: string | string[]
  tipComponentLayout?: LayoutRectangle
} & Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityLanguage'> &
  TestProps

export const Tooltip = ({
  accessibilityLabel,
  accessibilityLanguage = 'nl-NL',
  extraSpace,
  isOpen,
  placement,
  tipComponentLayout,
  testID,
  text,
  onPress,
}: Props) => {
  const props = {direction: mapPlacementToDirection(placement)}
  const setAccessibilityFocus = useAccessibilityFocus<View>()
  const styles = useThemable(
    createStyles({extraSpace, placement, tipComponentLayout}),
  )

  const ref = useRef(null)

  useEffect(() => {
    if (!ref?.current) {
      return
    }

    setAccessibilityFocus(ref.current)
  }, [isOpen, setAccessibilityFocus])

  if (!isOpen) {
    return null
  }

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityLanguage={accessibilityLanguage}
      accessibilityRole="alert"
      onPress={onPress}
      ref={ref}
      style={styles.tooltip}>
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

const createStyles =
  ({
    extraSpace,
    placement,
    tipComponentLayout,
  }: Pick<Props, 'extraSpace' | 'placement' | 'tipComponentLayout'>) =>
  ({size}: Theme) => {
    const getPosition = (): {
      left?: number
      position?: 'absolute' | 'relative'
      right?: number
      top?: number
    } => {
      if (!tipComponentLayout) {
        return {position: 'relative'}
      }

      const extraSpacing = extraSpace ? size.spacing[extraSpace] : 0

      return {
        left: 0,
        right: 0,
        position: 'absolute',
        top:
          placement === Placement.above
            ? tipComponentLayout.y - (tipComponentLayout.height + extraSpacing)
            : tipComponentLayout.y + (tipComponentLayout.height + extraSpacing),
      }
    }

    return StyleSheet.create({
      tooltip: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: size.spacing.lg,
        ...getPosition(),
        zIndex: 15,
      },
    })
  }

export type Tooltip = ElementRef<typeof Tooltip>
