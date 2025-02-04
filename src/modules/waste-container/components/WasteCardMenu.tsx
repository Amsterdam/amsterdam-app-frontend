import {useCallback} from 'react'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import {
  selectIsMenuVisible,
  setIsMenuVisible,
} from '@/modules/waste-container/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const WasteCardMenu = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const isMenuVisible = useSelector(selectIsMenuVisible)
  const removeSecureItems = useRemoveSecureItems()

  const onPress = useCallback(() => {
    dispatch(setIsMenuVisible(false))
    void removeSecureItems([SecureItemKey.wasteCardNumber]).then(() => {
      navigation.pop()
    })
  }, [dispatch, navigation, removeSecureItems])

  const menuItems: PopupMenuItem[] = [
    {
      color: 'warning',
      label: 'Verwijder afvalpas',
      onPress,
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
