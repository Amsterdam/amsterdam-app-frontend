import {ReactNode, useCallback, useEffect} from 'react'
import {LayoutRectangle} from 'react-native'
import {Tip} from '@/components/features/onboarding/types'
import {Tooltip} from '@/components/ui/feedback/tooltip/Tooltip'
import {Placement, TestProps} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {
  selectSeenTips,
  addSeenTip,
  resetSeenTips,
} from '@/store/slices/product-tour.slice'
import {SpacingTokens} from '@/themes/tokens/size'

type Props = {
  children: ReactNode
  extraSpace?: keyof SpacingTokens
  onboardingTipTargetLayout?: LayoutRectangle
  placement: Placement
  text: string
  tipSlug: Tip
} & TestProps

export const OnboardingTipWrapper = ({
  children,
  extraSpace,
  tipSlug,
  text,
  placement,
  onboardingTipTargetLayout,
  testID,
}: Props) => {
  const dispatch = useDispatch()
  const seenTips = useSelector(selectSeenTips)
  const hasSeenTip = seenTips.includes(tipSlug)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const handleHasSeenTip = useCallback(() => {
    dispatch(addSeenTip(tipSlug))
  }, [dispatch, tipSlug])

  // TODO: uncomment following lines when developing #99108
  // useEffect(
  //   () => () => {
  //     handleHasSeenTip()
  //   },
  //   [handleHasSeenTip],
  // )

  // TODO: remove following lines when developing #99108
  useEffect(
    () => () => {
      dispatch(resetSeenTips())
    },
    [dispatch],
  )

  return (
    <>
      {!!hasSeenTip && !isScreenReaderEnabled && (
        <Tooltip
          accessibilityLabel={text}
          extraSpace={extraSpace}
          fadeIn
          onboardingTipTargetLayout={onboardingTipTargetLayout}
          onPress={handleHasSeenTip}
          placement={placement}
          testID={testID}
          text={text}
        />
      )}
      {children}
    </>
  )
}
