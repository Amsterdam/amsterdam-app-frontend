import {ElementRef, ReactNode, forwardRef, useEffect, useRef} from 'react'
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

type TooltipProps = {
  /**
   * Extra space to set between target and tooltip
   */
  extraSpace?: keyof SpacingTokens
  /**
   * Determines whether the tooltip fades in and out. Default is 300 ms.
   */
  fadeIn?: boolean
  /**
   * Duration of the fade-in animation in milliseconds, only works when fade = true
   */
  fadeInDuration?: number
  onPress: () => void
  onboardingTipTargetLayout?: LayoutRectangle
  placement: Placement
  text: string | string[]
} & Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityLanguage'> &
  TestProps

type WrapperProps = {
  children: ReactNode
} & Pick<
  TooltipProps,
  | 'extraSpace'
  | 'fadeIn'
  | 'fadeInDuration'
  | 'onboardingTipTargetLayout'
  | 'placement'
>

const Wrapper = forwardRef<View, WrapperProps>(
  (
    {
      extraSpace,
      placement,
      onboardingTipTargetLayout,
      fadeIn,
      fadeInDuration,
      ...props
    },
    ref,
  ) => {
    const styles = useThemable(
      createStyles({
        extraSpace,
        placement,
        onboardingTipTargetLayout,
      }),
    )

    return fadeIn ? (
      <Fader
        {...props}
        duration={fadeInDuration}
        ref={ref}
        style={styles.tooltip}
      />
    ) : (
      <View
        {...props}
        ref={ref}
        style={styles.tooltip}
      />
    )
  },
)

export const Tooltip = ({
  accessibilityLabel,
  accessibilityLanguage = 'nl-NL',
  extraSpace,
  fadeIn,
  fadeInDuration,
  placement,
  onboardingTipTargetLayout,
  testID,
  text,
  onPress,
}: TooltipProps) => {
  const direction = mapPlacementToDirection(placement)
  const setAccessibilityFocus = useAccessibilityFocus<View>()

  const ref = useRef(null)

  useEffect(() => {
    if (!ref?.current) {
      return
    }

    setAccessibilityFocus(ref.current)
  }, [setAccessibilityFocus])

  const Pointer = <Triangle direction={direction} />

  return (
    <Wrapper
      extraSpace={extraSpace}
      fadeIn={fadeIn}
      fadeInDuration={fadeInDuration}
      onboardingTipTargetLayout={onboardingTipTargetLayout}
      placement={placement}>
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
  }: Pick<
    TooltipProps,
    'extraSpace' | 'placement' | 'onboardingTipTargetLayout'
  > & {
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