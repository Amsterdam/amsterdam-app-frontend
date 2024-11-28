import {useContext} from 'react'
import {StyleSheet} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Column} from '@/components/ui/layout/Column'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {ChatMenuItem} from '@/modules/chat/components/ChatMenuItem'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {useChat} from '@/modules/chat/slice'
import {downloadChat} from '@/modules/chat/utils/downloadChat'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'
import {Duration} from '@/types/duration'

export const ChatMenu = () => {
  const {setIsMenuOpen, headerHeight, isMenuOpen} = useChat()
  const theme = useTheme()
  const setAccessibilityFocus = useAccessibilityFocus(Duration.normal)
  const insets = useSafeAreaInsets()
  const sheetStyles = createStyles(theme, headerHeight, insets)
  const {addDownloadedTranscriptId} = useContext(ChatContext)

  return isMenuOpen ? (
    <Animated.View
      entering={FadeIn.duration(theme.duration.transition.short)}
      exiting={FadeOut.duration(theme.duration.transition.short)}
      style={sheetStyles.container}>
      <Column halign="start">
        <ChatMenuItem
          color="link"
          label="Chat downloaden"
          onPress={() => {
            setIsMenuOpen(false)
            void downloadChat().then(
              entryId => entryId && addDownloadedTranscriptId(entryId),
            )
          }}
          ref={setAccessibilityFocus}
          testID="ChatMenuPressableDownloadChat"
        />
        {/* <ChatMenuItem
          color="warning"
          label="Chat stoppen"
          onPress={() => setIsMenuOpen(false)}
          testID="ChatMenuPressableStopChat"
        /> */}
      </Column>
    </Animated.View>
  ) : null
}

const createStyles = (
  {color, z, size}: Theme,
  headerHeight: number,
  insets: EdgeInsets,
) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: size.spacing.sm,
      top: headerHeight + insets.top,
      backgroundColor: color.box.distinct,
      zIndex: z.tooltip,
      elevation: 2,
      shadowColor: color.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 0.3,
    },
  })
