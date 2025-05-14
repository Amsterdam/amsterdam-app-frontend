import {IconButton} from '@/components/ui/buttons/IconButton'
import {MeatballsMenuIcon} from '@/components/ui/media/icons/MeatballsMenuIcon'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectIsMenuVisible, setIsMenuVisible} from '@/store/slices/menu'
import {useTheme} from '@/themes/useTheme'

export const DashboardHeaderButton = () => {
  const {color} = useTheme()

  const dispatch = useDispatch()

  const isMenuVisible = useSelector(selectIsMenuVisible)

  return (
    <IconButton
      accessibilityLabel="Menu"
      icon={
        <MeatballsMenuIcon color={color.pressable.secondary.default.icon} />
      }
      onPress={() => {
        dispatch(setIsMenuVisible(!isMenuVisible))
      }}
      testID="ParkingDashboardHeaderButton"
    />
  )
}
