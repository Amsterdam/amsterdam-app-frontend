import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {selectIsMenuVisible} from '@/store/slices/menu'

type Props = {
  passNumber: number
}

export const CityPassDetailsMenu = ({passNumber}: Props) => {
  const {navigate} = useNavigation()
  const isMenuVisible = useSelector(selectIsMenuVisible)

  const menuItems: PopupMenuItem[] = [
    {
      color: 'warning',
      label: 'Pas blokkeren',
      onPress: () =>
        navigate(CityPassRouteName.cityPassBlockPass, {passNumber}),
      testID: 'CityPassDetailsMenuBlockButton',
    },
  ]

  return (
    <PopUpMenu
      isVisible={isMenuVisible}
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
    />
  )
}
