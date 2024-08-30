import {forwardRef} from 'react'
import {View} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {TooltipContent} from '@/components/ui/feedback/tooltip/TooltipContent'
import {TooltipWrapper} from '@/components/ui/feedback/tooltip/TooltipWrapper'
import {TooltipProps} from '@/components/ui/feedback/tooltip/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Placement} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils/mapPlacementToDirection'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'

export const Tooltip = forwardRef<View | null, TooltipProps>(
  (
    {
      accessibilityLabel,
      accessibilityLanguage = 'nl-NL',
      extraSpace,
      fadeIn,
      fadeInDuration,
      placement,
      productTourTipTargetLayout,
      onPress,
      startFadeIn,
      testID,
      text,
    },
    ref,
  ) => {
    const direction = mapPlacementToDirection(placement)
    const setAccessibilityFocus = useAccessibilityFocus()

    const Pointer = <Triangle direction={direction} />

    return (
      <TooltipWrapper
        extraSpace={extraSpace}
        fadeIn={fadeIn}
        fadeInDuration={fadeInDuration}
        placement={placement}
        productTourTipTargetLayout={productTourTipTargetLayout}
        ref={ref}
        startFadeIn={startFadeIn}>
        <PressableBase
          accessibilityLabel={accessibilityLabel}
          accessibilityLanguage={accessibilityLanguage}
          accessibilityRole="alert"
          onPress={onPress}
          ref={setAccessibilityFocus}
          testID={testID}>
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
        </PressableBase>
      </TooltipWrapper>
    )
  },
)
