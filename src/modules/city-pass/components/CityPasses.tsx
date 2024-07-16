import {useEffect} from 'react'
import Orientation from 'react-native-orientation-locker'
import {Overlay} from '@/components/ui/containers/Overlay'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {CityPassesSwiper} from '@/modules/city-pass/components/CityPassesSwiper'
import {DEFAULT_PASS_WIDTH} from '@/modules/city-pass/constants'
import {
  hideCityPasses,
  selectIsCityPassesVisible,
} from '@/modules/city-pass/slice'
import {useTheme} from '@/themes/useTheme'

export const CityPasses = () => {
  const dispatch = useDispatch()
  const isCityPassesVisible = useSelector(selectIsCityPassesVisible)
  const {color} = useTheme()

  useEffect(() => {
    isCityPassesVisible && Orientation.lockToPortrait()

    return () => {
      Orientation.unlockAllOrientations()
    }
  }, [isCityPassesVisible])

  return isCityPassesVisible ? (
    <Overlay
      backgroundColor={color.cityPass.overlay}
      closeButtonContainerWidth={DEFAULT_PASS_WIDTH}
      onClose={() => {
        dispatch(hideCityPasses())
      }}>
      <CityPassesSwiper />
    </Overlay>
  ) : null
}
