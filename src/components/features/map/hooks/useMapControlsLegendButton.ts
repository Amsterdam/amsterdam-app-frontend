import {useCallback} from 'react'
import {MapSheetVariants} from '@/components/features/map/constants'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const useMapControlsLegendButton = () => {
  const {toggle} = useBottomSheet()

  const onPressLegendButton = useCallback(() => {
    toggle(MapSheetVariants.legend)
  }, [toggle])

  return {onPressLegendButton}
}
