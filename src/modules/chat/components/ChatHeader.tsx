import {useContext} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {MeatballsMenu} from '@/modules/chat/assets/MeatballsMenu'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {useChat} from '@/modules/chat/slice'
import {devLog} from '@/processes/development'
import {useTheme} from '@/themes/useTheme'

export const ChatHeader = () => {
  const {toggleVisibility} = useChat()
  const {isMaximized} = useContext(ChatContext)

  const {color} = useTheme()
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets)

  const expandIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isMaximized ? '0deg' : '-180deg'),
      },
    ],
  }))
  const menuIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isMaximized ? 1 : 0),
  }))

  const onPressToggleVisibility = () => {
    toggleVisibility()
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <Box testID="ChatHeader">
        <Row
          align="between"
          valign="center">
          <Animated.View style={menuIconStyle}>
            <IconButton
              icon={
                <MeatballsMenu color={color.pressable.secondary.default.icon} />
              }
              onPress={() => devLog('ChatMenuButton')}
              testID="ChatHeaderMeatballsMenuButton"
            />
          </Animated.View>
          <Column>
            <ScreenTitle text="Chat" />
            <Phrase testID="">Nieuw Bericht</Phrase>
          </Column>
          <Animated.View style={expandIconStyle}>
            <IconButton
              icon={
                <Icon
                  color="link"
                  name="chevron-down"
                  size="lg"
                  testID="ChatHeaderToggleVisibilityButtonIcon"
                />
              }
              onPress={onPressToggleVisibility}
              testID="ChatHeaderToggleVisibilityButton"
            />
          </Animated.View>
        </Row>
      </Box>
    </View>
  )
}

const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top,
    },
  })
