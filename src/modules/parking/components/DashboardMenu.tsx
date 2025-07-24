import {useCallback} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useStore} from '@/hooks/redux/useStore'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {logout} from '@/modules/parking/utils/logout'
import {useMenu} from '@/store/slices/menu'

export const DashboardMenu = () => {
  const dispatch = useDispatch()
  const store = useStore()

  const parkingAccount = useParkingAccount()

  const {close} = useMenu()

  const onPressLogout = useCallback(() => {
    close()
    void logout(false, dispatch, store.getState())
  }, [dispatch, close, store])

  const {navigate} = useNavigation()

  const menuItemsAccountHolder: PopupMenuItem[] = [
    {
      color: 'link',
      label: 'Accountgegevens',
      onPress: () => {
        close()
        navigate(ParkingRouteName.accountDetails)
      },
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
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
    />
  )
}
