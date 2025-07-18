import {Meta, StoryObj} from '@storybook/react'
import {PopUpMenu} from './PopUpMenu'
import {PopupMenuItem, PopupMenuOrientation} from './types'
import {Canvas} from '@/storybook/components'

const menuItems: PopupMenuItem[] = [
  {
    color: 'link',
    label: 'Chat downloaden',
    onPress: () => null,
    testID: 'ChatMenuPressableDownloadChatItem',
  },
  {
    color: 'link',
    label: 'Privacy',
    onPress: () => null,
    testID: 'ChatMenuPressableChatPrivacyItem',
  },
  {
    color: 'warning',
    label: 'Chat stoppen',
    onPress: () => null,
    testID: 'ChatMenuPressableStopChatItem',
  },
]

export default {
  component: PopUpMenu,
  decorators: [Story => <Canvas height="135px">{<Story />}</Canvas>],
} as Meta<typeof PopUpMenu>

export const Default: StoryObj<typeof PopUpMenu> = {
  args: {
    menuItems,
    orientation: PopupMenuOrientation.left,
    topInset: 10,
  },
}
