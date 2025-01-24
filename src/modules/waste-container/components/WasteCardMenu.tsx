import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectIsMenuVisible} from '@/modules/waste-container/slice'

export const WasteCardMenu = () => {
  const isMenuVisible = useSelector(selectIsMenuVisible)

  const menuItems: PopupMenuItem[] = [
    {
      color: 'warning',
      label: 'Verwijder afvalpas',
      onPress: () => null,
      testID: 'WasteCardMenuDeleteButton',
    },
  ]

  return (
    <PopUpMenu
      isVisible={isMenuVisible}
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
      topInset={0}
    />
  )
}
