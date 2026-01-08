import {useCallback, useMemo} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useMenu} from '@/store/slices/menu'

export const DashboardMenu = () => {
  const {navigate} = useNavigation()

  const parkingAccount = useParkingAccount()

  const {close} = useMenu()

  const onPressLogout = useCallback(() => {
    close()
    navigate(ParkingRouteName.logout)
  }, [close, navigate])

  const menuItemsAccountHolder: PopupMenuItem[] = useMemo(
    () =>
      [
        {
          color: 'warning',
          label: 'Uitloggen',
          onPress: onPressLogout,
          testID: 'ParkingDashboardMenuAccountHolderLogoutButton',
        },
      ].filter(Boolean) as PopupMenuItem[],
    [onPressLogout],
  )

  const menuItemsVisitorAccount: PopupMenuItem[] = useMemo(
    () => [
      {
        color: 'warning',
        label: 'Uitloggen als bezoeker',
        onPress: onPressLogout,
        testID: 'ParkingDashboardMenuVisitorLogoutButton',
      },
    ],
    [onPressLogout],
  )

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
