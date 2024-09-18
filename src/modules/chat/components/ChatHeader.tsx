import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {MeatballsMenu} from '@/modules/chat/assets/MeatballsMenu'
import {useChat} from '@/modules/chat/slice'
import {devLog} from '@/processes/development'
import {useTheme} from '@/themes/useTheme'

export const ChatHeader = () => {
  const {toggleIsOpen} = useChat()
  const {color} = useTheme()

  return (
    <Box testID="ChatHeader">
      <Row
        align="between"
        valign="center">
        <IconButton
          icon={
            <MeatballsMenu color={color.pressable.secondary.default.icon} />
          }
          onPress={() => devLog('ChatMenuButton')}
          testID="ChatHeaderMeatballsMenuButton"
        />
        <ScreenTitle text="Chat" />
        <IconButton
          icon={
            <Icon
              color="link"
              name="chevron-down"
              size="lg"
              testID="ChatHeaderToggleVisibilityButtonIcon"
            />
          }
          onPress={toggleIsOpen}
          testID="ChatHeaderToggleVisibilityButton"
        />
      </Row>
    </Box>
  )
}
