import {useCallback} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectCurrentAccountType} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {logout} from '@/modules/parking/utils/logout'
import {selectIsMenuVisible, setIsMenuVisible} from '@/store/slices/menu'

export const DashboardMenu = () => {
  const dispatch = useDispatch()
  const isMenuVisible = useSelector(selectIsMenuVisible)

  const accountType =
    useSelector(selectCurrentAccountType) ?? ParkingPermitScope.permitHolder

  const onPressLogoutAccountHolder = useCallback(() => {
    dispatch(setIsMenuVisible(false))
    void logout(accountType, dispatch)
  }, [dispatch, accountType])

  const onPressLogoutVisitorAccount = useCallback(() => {
    dispatch(setIsMenuVisible(false))
    void logout(accountType, dispatch)
  }, [dispatch, accountType])

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
      onPress: onPressLogoutAccountHolder,
      testID: 'ParkingDashboardMenuAccountHolderLogoutButton',
    },
  ]

  const menuItemsVisitorAccount: PopupMenuItem[] = [
    {
      color: 'warning',
      label: 'Uitloggen als bezoeker',
      onPress: onPressLogoutVisitorAccount,
      testID: 'ParkingDashboardMenuVisitorLogoutButton',
    },
  ]
  const menuItems: PopupMenuItem[] =
    accountType === ParkingPermitScope.permitHolder
      ? menuItemsAccountHolder
      : menuItemsVisitorAccount

  return (
    <PopUpMenu
      isVisible={isMenuVisible}
      menuItems={menuItems}
      orientation={PopupMenuOrientation.right}
      topInset={0}
    />
  )
}
