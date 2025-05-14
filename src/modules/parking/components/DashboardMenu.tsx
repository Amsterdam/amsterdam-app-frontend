import {useCallback} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import {selectCurrentAccountType} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {selectIsMenuVisible, setIsMenuVisible} from '@/store/slices/menu'
import {SecureItemKey} from '@/utils/secureStorage'

export const DashboardMenu = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const isMenuVisible = useSelector(selectIsMenuVisible)
  const removeSecureItems = useRemoveSecureItems()

  const onPressLogoutAccountHolder = useCallback(() => {
    dispatch(setIsMenuVisible(false))
    void removeSecureItems([SecureItemKey.parkingPermitHolder]).then(() => {
      navigation.pop()
    })
  }, [dispatch, navigation, removeSecureItems])

  const onPressLogoutVisitorAccount = useCallback(() => {
    dispatch(setIsMenuVisible(false))
    void removeSecureItems([SecureItemKey.parkingVisitor]).then(() => {
      navigation.pop()
    })
  }, [dispatch, navigation, removeSecureItems])

  const accountType = useSelector(selectCurrentAccountType)

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
