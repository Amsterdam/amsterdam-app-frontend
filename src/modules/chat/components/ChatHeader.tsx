import {ReactNode, useEffect} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Keyboard, Pressable, StyleSheet, View, ViewProps} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenHeaderTitle} from '@/components/ui/text/ScreenHeaderTitle'
import {MeatballsMenu} from '@/modules/chat/assets/MeatballsMenu'
import {NewMessageIndicator} from '@/modules/chat/components/NewMessageIndicator'
import {useChat} from '@/modules/chat/slice'
import {useScreen} from '@/store/slices/screen'
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
  ...viewProps
}: WrapperProps) =>
  isMaximized ? (
    children
  ) : (
    <Pressable
      {...viewProps}
      onPress={onPress}
      style={style}>
      {children}
    </Pressable>
  )

export const ChatHeader = () => {
  const {
    isMaximized,
    isMenuOpen,
    setHeaderHeight,
    setIsMenuOpen,
    toggleVisibility,
  } = useChat()

  const {setHideFromAccessibility} = useScreen()

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
    setIsMenuOpen(false)
  }

  useEffect(() => {
    setHideFromAccessibility(isMaximized)

    return () => {
      setHideFromAccessibility(false)
    }
  }, [isMaximized, setHideFromAccessibility])

  return (
    <View
      onLayout={layout => setHeaderHeight(layout.nativeEvent.layout.height)}
      style={styles.container}>
      <PressableWhenMinimized
        accessibilityHint="Activeer om de chat te maximaliseren"
        isMaximized={isMaximized}
        onPress={toggleVisibility}
        style={styles.pressableWhenMinimized}>
        <Box testID="ChatHeader">
          <Row
            align="between"
            valign="center">
            <Animated.View style={menuIconStyle}>
              <IconButton
                accessibilityLabel={`Chat menu ${isMenuOpen ? 'sluiten' : 'openen'}.`}
                icon={
                  <MeatballsMenu
                    color={color.pressable.secondary.default.icon}
                  />
                }
                onPress={() => setIsMenuOpen(!isMenuOpen)}
                pointerEvents={isMaximized ? 'auto' : 'none'}
                testID="ChatHeaderMeatballsMenuButton"
              />
            </Animated.View>
            <View accessible>
              <Row
                gutter="xs"
                valign="center">
                <ScreenHeaderTitle text="Chat" />
                <NewMessageIndicator />
              </Row>
            </View>
            <Animated.View style={expandIconStyle}>
              <IconButton
                accessibilityLabel={`Chat ${isMaximized ? 'minimaliseren' : 'maximaliseren'}`}
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
