import {IconButton} from '@/components/ui/buttons/IconButton'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {MeatballsMenu} from '@/modules/chat/assets/MeatballsMenu'
import {
  selectIsMenuVisible,
  setIsMenuVisible,
} from '@/modules/waste-container/slice'
import {useTheme} from '@/themes/useTheme'

export const WasteCardHeaderMenuButton = () => {
  const dispatch = useDispatch()
  const isMenuVisible = useSelector(selectIsMenuVisible)
  const {color} = useTheme()

  return (
    <IconButton
      accessibilityLabel={`Afvalpas menu ${isMenuVisible ? 'sluiten' : 'openen'}.`}
      icon={<MeatballsMenu color={color.pressable.secondary.default.icon} />}
      onPress={() => dispatch(setIsMenuVisible(!isMenuVisible))}
      testID="ChatHeaderMeatballsMenuButton"
    />
  )
}
