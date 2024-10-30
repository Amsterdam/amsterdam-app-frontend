import {ReactNode, useState} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Keyboard, Pressable, StyleSheet, View, ViewProps} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {MeatballsMenu} from '@/modules/chat/assets/MeatballsMenu'
import {ChatMenu} from '@/modules/chat/components/ChatMenu'
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
  const [isChatMenuVisible, setChatMenuVisible] = useState(false)
  const [height, setHeight] = useState(0)

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

  const toggleChatMenu = () => {
    setChatMenuVisible(state => !state)
  }

  return (
    <View
      onLayout={layout => setHeight(layout.nativeEvent.layout.height)}
      style={styles.container}>
      <Box testID="ChatHeader">
        <PressableWhenMinimized
          isMaximized={isMaximized}
          onPress={toggleVisibility}
          style={styles.pressableWhenMinimized}>
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
                onPress={toggleChatMenu}
                pointerEvents={isMaximized ? 'auto' : 'none'}
                testID="ChatHeaderMeatballsMenuButton"
              />
            </Animated.View>
            <ScreenTitle text="Chat" />
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
        </PressableWhenMinimized>
      </Box>
      {!!isChatMenuVisible && <ChatMenu headerHeight={height} />}
    </View>
  )
}

const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top,
      zIndex: 1,
    },
    pressableWhenMinimized: {
      flexGrow: 1,
    },
  })
