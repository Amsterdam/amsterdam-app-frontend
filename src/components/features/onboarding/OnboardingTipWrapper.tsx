import {ReactNode, useCallback, useEffect} from 'react'
import {LayoutRectangle} from 'react-native'
import {useDispatch} from 'react-redux'
import {Tooltip} from '@/components/ui/feedback/tooltip/Tooltip'
import {Placement} from '@/components/ui/types'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {selectSeenTips, addSeenTip} from '@/store/slices/product-tour.slice'

type Props = {
  children: ReactNode
  placement: Placement
  slug: string
  text: string
  tipComponentLayout?: LayoutRectangle
}

export const OnboardingTipWrapper = ({
  children,
  slug,
  text,
  placement,
  tipComponentLayout,
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
        isOpen={!hasSeenTip || true}
        onPress={handleHasSeenTip}
        placement={placement}
        text={text}
        tipComponentLayout={tipComponentLayout}
      />
      {children}
    </>
  )
}
