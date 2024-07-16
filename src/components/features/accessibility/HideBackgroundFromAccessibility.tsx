import {ReactNode} from 'react'
import {ViewProps} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectIsCityPassesVisible} from '@/modules/city-pass/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  children: ReactNode
} & ViewProps

export const HideFromAccessibilityWhenInBackground = (props: Props) => {
  const {isOpen} = useBottomSheet()
  const isCityPassesVisible = useSelector(selectIsCityPassesVisible)

  return (
    <HideFromAccessibility
      hide={isOpen || isCityPassesVisible}
      {...props}
    />
  )
}
