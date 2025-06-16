import {useCallback} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useStore} from '@/hooks/redux/useStore'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {ParkingPermitScope} from '@/modules/parking/types'
import {logout} from '@/modules/parking/utils/logout'
import {selectIsMenuVisible, setIsMenuVisible} from '@/store/slices/menu'

export const DashboardMenu = () => {
  const dispatch = useDispatch()
  const isMenuVisible = useSelector(selectIsMenuVisible)
  const store = useStore()

  const parkingAccount = useParkingAccount()

  const onPressLogout = useCallback(() => {
    dispatch(setIsMenuVisible(false))
    void logout(false, dispatch, store.getState())
  }, [dispatch, store])

  const menuItemsAccountHolder: PopupMenuItem[] = [
    {
      color: 'link',
      label: 'Accountgegevens',
      onPress: () => null,
      testID: 'ParkingDashboardMenuAccountDetailsButton',
    },
    {
      color: 'warning',
      label: 'Uitloggen',
      onPress: onPressLogout,
      testID: 'ParkingDashboardMenuAccountHolderLogoutButton',
    },
  ]

  const menuItemsVisitorAccount: PopupMenuItem[] = [
    {
      color: 'warning',
      label: 'Uitloggen als bezoeker',
      onPress: onPressLogout,
      testID: 'ParkingDashboardMenuVisitorLogoutButton',
    },
  ]
  const menuItems: PopupMenuItem[] =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? menuItemsVisitorAccount
      : menuItemsAccountHolder

  return (
    <PopUpMenu
      isVisible={isMenuVisible}
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
    />
  )
}
