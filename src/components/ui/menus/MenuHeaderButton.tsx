import {IconButton} from '@/components/ui/buttons/IconButton'
import {MeatballsMenuIcon} from '@/components/ui/media/icons/MeatballsMenuIcon'
import {TestProps} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectIsMenuVisible, setIsMenuVisible} from '@/store/slices/menu'
import {useTheme} from '@/themes/useTheme'

type Props = TestProps

export const MenuHeaderButton = ({testID}: Props) => {
  const {color} = useTheme()

  const dispatch = useDispatch()

  const isMenuVisible = useSelector(selectIsMenuVisible)

  return (
    <IconButton
      accessibilityLabel={`Menu ${isMenuVisible ? 'sluiten' : 'openen'}.`}
      icon={
        <MeatballsMenuIcon color={color.pressable.secondary.default.icon} />
      }
      onPress={() => {
        dispatch(setIsMenuVisible(!isMenuVisible))
      }}
      testID={testID}
    />
  )
}
