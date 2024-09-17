import {StyleSheet, ViewProps} from 'react-native'
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {MeatballsMenu} from '@/modules/chat/assets/MeatballsMenu'
import {useChat} from '@/modules/chat/slice'
import {devLog} from '@/processes/development'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {useTheme} from '@/themes/useTheme'

type Props = ViewProps

export const Chat = ({...viewProps}: Props) => {
  const {toggleIsOpen, isOpen} = useChat()
  const {color} = useTheme()
  const styles = useThemable(createStyles)

  return isOpen ? (
    <Animated.View
      {...viewProps}
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[viewProps.style, StyleSheet.absoluteFill, styles.container]}>
      <SafeArea>
        <Box>
          <Column gutter="md">
            <Box insetVertical="md">
              <Row
                align="between"
                valign="center">
                <IconButton
                  icon={
                    <MeatballsMenu
                      color={color.pressable.secondary.default.label}
                    />
                  }
                  onPress={() => devLog('ChatMenuButton')}
                  testID="ChatMenuButton"
                />
                <ScreenTitle text="Chat" />
                <IconButton
                  icon={
                    <Icon
                      color="link"
                      name="chevron-down"
                      testID="ChatToggleVisibilityButtonIcon"
                    />
                  }
                  onPress={toggleIsOpen}
                  testID="ChatToggleVisibilityButton"
                />
              </Row>
            </Box>
          </Column>
        </Box>
      </SafeArea>
    </Animated.View>
  ) : null
}

const createStyles = ({z, color}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.screen.background.default,
      zIndex: z.overlay,
    },
  })
