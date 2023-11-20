import {ReactNode, useCallback, useEffect} from 'react'
import {LayoutRectangle} from 'react-native'
import {Tooltip} from '@/components/ui/feedback/tooltip/Tooltip'
import {Placement, TestProps} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {selectSeenTips, addSeenTip} from '@/store/slices/product-tour.slice'
import {SpacingTokens} from '@/themes/tokens/size'

type Props = {
  children: ReactNode
  extraSpace?: keyof SpacingTokens
  onboardingTipTargetLayout?: LayoutRectangle
  placement: Placement
  slug: string
  text: string
} & TestProps

export const OnboardingTipWrapper = ({
  children,
  extraSpace,
  slug,
  text,
  placement,
  onboardingTipTargetLayout,
  testID,
}: Props) => {
  const dispatch = useDispatch()
  const seenTips = useSelector(selectSeenTips)
  const hasSeenTip = seenTips.includes(slug)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const handleHasSeenTip = useCallback(() => {
    dispatch(addSeenTip(slug))
  }, [dispatch, slug])

  useEffect(
    () => () => {
      handleHasSeenTip()
    },
    [handleHasSeenTip],
  )

  if (isScreenReaderEnabled) {
    return null
  }

  return (
    <>
      <Tooltip
        accessibilityLabel={text}
        defaultIsOpen={!hasSeenTip}
        extraSpace={extraSpace}
        fadeIn
        isOpen={!hasSeenTip}
        onboardingTipTargetLayout={onboardingTipTargetLayout}
        onPress={handleHasSeenTip}
        placement={placement}
        testID={testID}
        text={text}
      />
      {children}
    </>
  )
}
