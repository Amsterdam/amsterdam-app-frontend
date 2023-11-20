import {ElementRef, FC, ReactNode, useCallback, useEffect, useRef} from 'react'
import {
  AccessibilityProps,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import {Fader} from '@/components/ui/animations/Fader'
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
  /**
   * Extra space to set between target and tooltip
   */
  extraSpace?: keyof SpacingTokens
  /**
   * Determines whether the tooltip fades in and out. Default is 300 ms.
   */
  fade?: boolean
  /**
   * Duration of the fade animation in milliseconds, only works when fade = true
   */
  fadeDuration?: number
  isOpen: boolean
  onPress: () => void
  onboardingTipTargetLayout?: LayoutRectangle
  placement: Placement
  text: string | string[]
} & Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityLanguage'> &
  TestProps

export const Tooltip = ({
  accessibilityLabel,
  accessibilityLanguage = 'nl-NL',
  extraSpace,
  fade,
  fadeDuration,
  isOpen,
  placement,
  onboardingTipTargetLayout,
  testID,
  text,
  onPress,
}: Props) => {
  const direction = mapPlacementToDirection(placement)
  const setAccessibilityFocus = useAccessibilityFocus<View>()
  const styles = useThemable(
    createStyles({
      extraSpace,
      placement,
      onboardingTipTargetLayout,
    }),
  )

  const ref = useRef(null)

  useEffect(() => {
    if (!ref?.current) {
      return
    }

    setAccessibilityFocus(ref.current)
  }, [isOpen, setAccessibilityFocus])

  const Wrapper: FC<{children: ReactNode}> = useCallback(
    props =>
      fade ? (
        <Fader
          {...props}
          duration={fadeDuration}
          ref={ref}
          style={styles.tooltip}
        />
      ) : (
        <View
          {...props}
          ref={ref}
          style={styles.tooltip}
        />
      ),
    [fade, fadeDuration, styles.tooltip],
  )

  if (!isOpen || !onboardingTipTargetLayout) {
    return null
  }

  const Pointer = <Triangle direction={direction} />

  return (
    <Wrapper>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityLanguage={accessibilityLanguage}
        accessibilityRole="alert"
        onPress={onPress}>
        <Row>
          {placement === Placement.after && Pointer}
          <Column>
            {placement === Placement.below && Pointer}
            <TooltipContent
              testID={testID}
              text={text}
            />
            {placement === Placement.above && Pointer}
          </Column>
          {placement === Placement.before && Pointer}
        </Row>
      </Pressable>
    </Wrapper>
  )
}

const createStyles =
  ({
    extraSpace,
    placement,
    onboardingTipTargetLayout,
  }: Pick<Props, 'extraSpace' | 'placement' | 'onboardingTipTargetLayout'> & {
    tooltipHeight?: number
  }) =>
  ({size}: Theme) => {
    const getPosition = (): {
      bottom?: number
      left?: number
      position?: 'absolute' | 'relative'
      right?: number
      top?: number
    } => {
      if (!onboardingTipTargetLayout) {
        return {position: 'relative'} // Default position, when no onboardingTipTargetLayout is set
      }

      const verticalPosition =
        onboardingTipTargetLayout.height +
        (extraSpace ? size.spacing[extraSpace] : 0)

      return {
        left: 0,
        right: 0,
        position: 'absolute',
        ...(placement === Placement.above
          ? {bottom: verticalPosition}
          : {top: verticalPosition}),
      }
    }

    return StyleSheet.create({
      tooltip: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: size.spacing.lg,
        ...getPosition(),
        zIndex: 15, // Set zIndex higher in component tree as well when not working as expected on iOS
      },
    })
  }

export type Tooltip = ElementRef<typeof Tooltip>
