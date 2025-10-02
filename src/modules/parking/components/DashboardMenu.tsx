import {useCallback, useMemo} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingApiVersion, ParkingPermitScope} from '@/modules/parking/types'
import {useMenu} from '@/store/slices/menu'

export const DashboardMenu = () => {
  const {navigate} = useNavigation()
  const apiVersion = useCurrentParkingApiVersion()

  const parkingAccount = useParkingAccount()

  const {close} = useMenu()

  const onPressLogout = useCallback(() => {
    close()
    navigate(ParkingRouteName.logout)
  }, [close, navigate])

  const menuItemsAccountHolder: PopupMenuItem[] = useMemo(
    () => [
      {
        id: 'accountDetails',
        color: 'link',
        label: 'Accountgegevens',
        onPress: () => {
          close()
          navigate(ParkingRouteName.accountDetails)
        },
        testID: 'ParkingDashboardMenuAccountDetailsButton',
      },
      {
        id: 'logout',
        color: 'warning',
        label: 'Uitloggen',
        onPress: onPressLogout,
        testID: 'ParkingDashboardMenuAccountHolderLogoutButton',
      },
    ],
    [close, navigate, onPressLogout],
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

  const menuItems: PopupMenuItem[] = useMemo(() => {
    if (parkingAccount?.scope === ParkingPermitScope.visitor) {
      return menuItemsVisitorAccount
    }

    return menuItemsAccountHolder.filter(
      item =>
        apiVersion === ParkingApiVersion.v1 || item.id !== 'accountDetails',
    )
  }, [
    parkingAccount?.scope,
    menuItemsAccountHolder,
    menuItemsVisitorAccount,
    apiVersion,
  ])

  return (
    <PopUpMenu
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
    />
  )
}
