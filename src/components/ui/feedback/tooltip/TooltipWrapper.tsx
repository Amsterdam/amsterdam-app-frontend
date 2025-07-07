import {forwardRef} from 'react'
import {StyleSheet, useWindowDimensions, View, ViewProps} from 'react-native'
import {Fader} from '@/components/ui/animations/Fader'
import {
  TooltipProps,
  WrapperProps,
} from '@/components/ui/feedback/tooltip/types'
import {Placement} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const TooltipWrapper = forwardRef<View, WrapperProps & ViewProps>(
  (
    {
      extraSpace,
      isPositioned,
      leftPosition,
      placement,
      productTourTipTargetLayout,
      fadeIn,
      fadeInDuration,
      startFadeIn,
      ...props
    },
    ref,
  ) => {
    const {width: windowWidth} = useWindowDimensions()
    const styles = useThemable(
      createStyles({
        extraSpace,
        isPositioned,
        leftPosition,
        placement,
        productTourTipTargetLayout,
        windowWidth,
      }),
    )

    return fadeIn ? (
      <Fader
        {...props}
        duration={fadeInDuration}
        ref={ref}
        shouldAnimate={startFadeIn}
        style={styles.tooltipWrapper}
      />
    ) : (
      <View
        {...props}
        ref={ref}
        style={styles.tooltipWrapper}
      />
    )
  },
)

const createStyles =
  ({
    extraSpace,
    isPositioned,
    leftPosition,
    placement,
    productTourTipTargetLayout,
    windowWidth,
  }: Pick<
    TooltipProps,
    'extraSpace' | 'placement' | 'productTourTipTargetLayout'
  > & {isPositioned: boolean; leftPosition: number; windowWidth: number}) =>
  ({size, z}: Theme) => {
    const getPosition = (): {
      bottom?: number
      left?: number
      position?: 'absolute' | 'relative'
      right?: number
      top?: number
    } => {
      const verticalPosition =
        productTourTipTargetLayout.height +
        (extraSpace ? size.spacing[extraSpace] : 0)

      return {
        ...(placement === Placement.above
          ? {bottom: verticalPosition}
          : {top: verticalPosition}),
      }
    }

    return StyleSheet.create({
      tooltipWrapper: {
        display: isPositioned ? 'flex' : 'none',
        width: productTourTipTargetLayout ? windowWidth : undefined,
        left: -leftPosition,
        position: 'absolute',
        paddingHorizontal: productTourTipTargetLayout
          ? size.spacing.xl
          : undefined,
        ...getPosition(),
        zIndex: z.tooltip, // Set zIndex higher in component tree as well when not working as expected on iOS
      },
    })
  }
