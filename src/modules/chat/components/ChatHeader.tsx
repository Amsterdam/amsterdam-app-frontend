import {ReactNode, useState} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Keyboard, Pressable, StyleSheet, View, ViewProps} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {useToggle} from '@/hooks/useToggle'
import {MeatballsMenu} from '@/modules/chat/assets/MeatballsMenu'
import {ChatMenu} from '@/modules/chat/components/ChatMenu'
import {NewMessageIndicator} from '@/modules/chat/components/NewMessageIndicator'
import {useChat} from '@/modules/chat/slice'
import {useTheme} from '@/themes/useTheme'

type WrapperProps = {
  children: ReactNode
  isMaximized: boolean
  onPress: () => void
} & ViewProps

const PressableWhenMinimized = ({
  children,
  isMaximized,
  onPress,
  style,
}: WrapperProps) =>
  isMaximized ? (
    <>{children}</>
  ) : (
    <Pressable
      onPress={onPress}
      style={style}>
      {children}
    </Pressable>
  )

export const ChatHeader = () => {
  const {isMaximized, toggleVisibility} = useChat()
  const {
    value: isChatMenuVisible,
    toggle: toggleIsChatMenuVisible,
    disable: hideChatMenu,
  } = useToggle(false)
  const [height, setHeight] = useState(0)

  const {color} = useTheme()
  const styles = createStyles()

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
    hideChatMenu()
  }

  return (
    <View
      onLayout={layout => setHeight(layout.nativeEvent.layout.height)}
      style={styles.container}>
      <PressableWhenMinimized
        isMaximized={isMaximized}
        onPress={toggleVisibility}
        style={styles.pressableWhenMinimized}>
        <Box testID="ChatHeader">
          <Row
            align="between"
            valign="center">
            <Animated.View style={menuIconStyle}>
              <IconButton
                icon={
                  <MeatballsMenu
                    color={color.pressable.secondary.default.icon}
                  />
                }
                onPress={toggleIsChatMenuVisible}
                pointerEvents={isMaximized ? 'auto' : 'none'}
                testID="ChatHeaderMeatballsMenuButton"
              />
            </Animated.View>
            <Row
              gutter="xs"
              valign="center">
              <ScreenTitle text="Chat" />
              <NewMessageIndicator />
            </Row>
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
      </PressableWhenMinimized>
      {!!isChatMenuVisible && (
        <ChatMenu
          close={hideChatMenu}
          headerHeight={height}
        />
      )}
    </View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      zIndex: 1,
    },
    pressableWhenMinimized: {
      flexGrow: 1,
    },
  })
