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
    () =>
      [
        apiVersion === ParkingApiVersion.v1 && {
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
      ].filter(Boolean) as PopupMenuItem[],
    [apiVersion, close, navigate, onPressLogout],
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
