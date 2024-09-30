import {StyleProp, ViewStyle} from 'react-native'
import Animated, {AnimatedStyle} from 'react-native-reanimated'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {MeatballsMenu} from '@/modules/chat/assets/MeatballsMenu'
import {useChat} from '@/modules/chat/slice'
import {devLog} from '@/processes/development'
import {useTheme} from '@/themes/useTheme'

type Props = {
  styles: {
    expandIcon: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
    menuIcon: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
  }
}

export const ChatHeader = ({styles: {expandIcon, menuIcon}}: Props) => {
  const {toggleVisibility} = useChat()
  const {color} = useTheme()

  return (
    <Box testID="ChatHeader">
      <Row
        align="between"
        valign="center">
        <Animated.View style={menuIcon}>
          <IconButton
            icon={
              <MeatballsMenu color={color.pressable.secondary.default.icon} />
            }
            onPress={() => devLog('ChatMenuButton')}
            testID="ChatHeaderMeatballsMenuButton"
          />
        </Animated.View>
        <ScreenTitle text="Chat" />
        <Animated.View style={expandIcon}>
          <IconButton
            icon={
              <Icon
                color="link"
                name="chevron-down"
                size="lg"
                testID="ChatHeaderToggleVisibilityButtonIcon"
              />
            }
            onPress={toggleVisibility}
            testID="ChatHeaderToggleVisibilityButton"
          />
        </Animated.View>
      </Row>
    </Box>
  )
}
