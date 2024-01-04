import {
  ComponentType,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {LayoutRectangle, View, ViewProps} from 'react-native'
import {
  selectSeenTips,
  addSeenTip,
} from '@/components/features/onboarding/product-tour.slice'
import {Tip} from '@/components/features/onboarding/types'
import {ScrollContext} from '@/components/features/onboarding/withTrackScroll'
import {Tooltip} from '@/components/ui/feedback/tooltip/Tooltip'
import {Placement, TestProps} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {SpacingTokens} from '@/themes/tokens/size'

type Props = {
  children: ReactNode
  extraSpace?: keyof SpacingTokens
  placement: Placement
  text: string
  tipSlug: Tip
} & TestProps

export const withOnboardingTip =
  (WrappedComponent: ComponentType<ViewProps>) =>
  ({children, extraSpace, tipSlug, text, placement, testID}: Props) => {
    const dispatch = useDispatch()
    const seenTips = useSelector(selectSeenTips)
    const hasSeenTip = seenTips.includes(tipSlug)
    const isScreenReaderEnabled = useIsScreenReaderEnabled()
    const scrollContext = useContext(ScrollContext)
    const hasNoScrollView = scrollContext === null
    const {setElementRef, isElementVisible} = scrollContext ?? {}
    const [onboardingTipTargetLayout, setTipComponentLayout] =
      useState<LayoutRectangle>()

    const handleHasSeenTip = useCallback(() => {
      isElementVisible && dispatch(addSeenTip(tipSlug))
    }, [dispatch, isElementVisible, tipSlug])

    useEffect(() => handleHasSeenTip, [handleHasSeenTip])

    return (
      <>
        {!hasSeenTip && !isScreenReaderEnabled && (
          <Tooltip
            accessibilityLabel={text}
            extraSpace={extraSpace}
            fadeIn
            onboardingTipTargetLayout={onboardingTipTargetLayout}
            onPress={handleHasSeenTip}
            placement={placement}
            ref={setElementRef}
            startFadeIn={isElementVisible || hasNoScrollView}
            testID={testID}
            text={text}
          />
        )}
        <View collapsable={false}>
          <WrappedComponent
            onLayout={e => setTipComponentLayout(e.nativeEvent.layout)}>
            {children}
          </WrappedComponent>
        </View>
      </>
    )
  }
