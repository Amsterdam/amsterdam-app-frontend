import {useCallback} from 'react'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const useMapControlsLegendButton = () => {
  const {toggle} = useBottomSheet()

  const onPressLegendButton = useCallback(() => {
    toggle('legend')
  }, [toggle])

  return {onPressLegendButton}
}
