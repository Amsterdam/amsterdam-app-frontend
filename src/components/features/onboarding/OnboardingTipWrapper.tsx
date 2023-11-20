import {ReactNode, useCallback, useEffect} from 'react'
import {LayoutRectangle} from 'react-native'
import {useDispatch} from 'react-redux'
import {Tooltip} from '@/components/ui/feedback/tooltip/Tooltip'
import {Placement} from '@/components/ui/types'
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
}

export const OnboardingTipWrapper = ({
  children,
  extraSpace,
  slug,
  text,
  placement,
  onboardingTipTargetLayout,
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
        fade
        isOpen={!hasSeenTip}
        onboardingTipTargetLayout={onboardingTipTargetLayout}
        onPress={handleHasSeenTip}
        placement={placement}
        text={text}
      />
      {children}
    </>
  )
}
