import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {PopUpMenu} from '@/components/ui/menus/PopUpMenu'
import {PopupMenuOrientation} from '@/components/ui/menus/types'
import {useChatMenuItems} from '@/modules/chat/hooks/useChatMenuItems'
import {useChat} from '@/modules/chat/slice'

export const ChatMenu = () => {
  const {headerHeight, isMenuOpen} = useChat()
  const chatMenuItems = useChatMenuItems()
  const safeAreaInsets = useSafeAreaInsets()

  return (
    <PopUpMenu
      isVisible={isMenuOpen}
      menuItems={chatMenuItems}
      orientation={PopupMenuOrientation.left}
      topInset={headerHeight + safeAreaInsets.top}
    />
  )
}
