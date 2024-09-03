import {ReactNode, useCallback, useContext, useRef} from 'react'
import {View} from 'react-native'
import {
  selectSeenTips,
  addSeenTip,
} from '@/components/features/product-tour/slice'
import {Tip} from '@/components/features/product-tour/types'
import {useMeasureTarget} from '@/components/features/product-tour/useMeasureTarget'
import {ScrollContext} from '@/components/features/product-tour/withTrackScroll'
import {Tooltip} from '@/components/ui/feedback/tooltip/Tooltip'
import {Placement, TestProps} from '@/components/ui/types'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {SpacingTokens} from '@/themes/tokens/size'

type Props = {
  children: ReactNode
  extraSpace?: keyof SpacingTokens
  placement: Placement
  text: string
  tipSlug: Tip
} & TestProps

export const ProductTourTipWrapper = ({
  children,
  extraSpace,
  tipSlug,
  text,
  placement,
  testID,
}: Props) => {
  const dispatch = useDispatch()
  const seenTips = useSelector(selectSeenTips)
  const hasSeenTip = seenTips.includes(tipSlug)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const scrollContext = useContext(ScrollContext)
  const hasNoScrollViewParent = scrollContext === null
  const {setElementRef, isElementVisible} = scrollContext ?? {}
  const tipTargetRef = useRef<View | null>(null)
  const {layout: productTourTipTargetLayout, measureTarget} =
    useMeasureTarget(tipTargetRef)

  const handleHasSeenTip = useCallback(() => {
    if ((hasNoScrollViewParent || isElementVisible) && !hasSeenTip) {
      dispatch(addSeenTip(tipSlug))
    }
  }, [dispatch, hasNoScrollViewParent, hasSeenTip, isElementVisible, tipSlug])

  useBlurEffect(handleHasSeenTip)

  return (
    <View>
      {!hasSeenTip && !isScreenReaderEnabled && (
        <Tooltip
          accessibilityLabel={text}
          extraSpace={extraSpace}
          fadeIn
          onPress={handleHasSeenTip}
          placement={placement}
          productTourTipTargetLayout={productTourTipTargetLayout}
          ref={setElementRef}
          startFadeIn={isElementVisible ?? hasNoScrollViewParent}
          testID={testID}
          text={text}
        />
      )}
      <View
        collapsable={false}
        onLayout={measureTarget}
        ref={tipTargetRef}>
        {children}
      </View>
    </View>
  )
}
