import {forwardRef} from 'react'
import {StyleSheet, View} from 'react-native'
import {Fader} from '@/components/ui/animations/Fader'
import {
  TooltipProps,
  WrapperProps,
} from '@/components/ui/feedback/tooltip/types'
import {Placement} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const TooltipWrapper = forwardRef<View, WrapperProps>(
  (
    {
      extraSpace,
      placement,
      productTourTipTargetLayout,
      fadeIn,
      fadeInDuration,
      startFadeIn,
      ...props
    },
    ref,
  ) => {
    const styles = useThemable(
      createStyles({
        extraSpace,
        placement,
        productTourTipTargetLayout,
      }),
    )

    return fadeIn ? (
      <Fader
        {...props}
        duration={fadeInDuration}
        ref={ref}
        shouldAnimate={startFadeIn}
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

const createStyles =
  ({
    extraSpace,
    placement,
    productTourTipTargetLayout,
  }: Pick<
    TooltipProps,
    'extraSpace' | 'placement' | 'productTourTipTargetLayout'
  > & {
    tooltipHeight?: number
  }) =>
  ({size, z}: Theme) => {
    const getPosition = (): {
      bottom?: number
      left?: number
      position?: 'absolute' | 'relative'
      right?: number
      top?: number
    } => {
      if (!productTourTipTargetLayout) {
        return {position: 'relative'} // Default position, when no productTourTipTargetLayout is set
      }

      const verticalPosition =
        productTourTipTargetLayout.height +
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
        zIndex: z.tooltip, // Set zIndex higher in component tree as well when not working as expected on iOS
      },
    })
  }
