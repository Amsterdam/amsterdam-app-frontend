import {useContext} from 'react'
import {Alert, StyleSheet} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {sendMessage} from 'react-native-salesforce-messaging-in-app/src'
import {Column} from '@/components/ui/layout/Column'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {ChatMenuItem} from '@/modules/chat/components/ChatMenuItem'
import {CLOSE_CHAT_MESSAGE} from '@/modules/chat/constants'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {useChat} from '@/modules/chat/slice'
import {downloadChat} from '@/modules/chat/utils/downloadChat'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'
import {Duration} from '@/types/duration'

export const ChatMenu = () => {
  const {setIsMenuOpen, headerHeight, isMenuOpen, close} = useChat()
  const theme = useTheme()
  const setAccessibilityFocus = useAccessibilityFocus(Duration.normal)
  const insets = useSafeAreaInsets()
  const sheetStyles = createStyles(theme, headerHeight, insets)
  const {addDownloadedTranscriptId, endChat, ready} = useContext(ChatContext)
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

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
        {!isLoading && !isError && (
          <ChatMenuItem
            color="link"
            label="Privacy"
            onPress={() => {
              if (redirectUrls?.chatPrivacy) {
                setIsMenuOpen(false)
                openWebUrl(redirectUrls.chatPrivacy)
              } else {
                Alert.alert(
                  'Sorry, deze functie is nu niet beschikbaar. Probeer het later nog eens.',
                )

                trackException(ExceptionLogKey.getRedirectsUrl, 'ChatMenu.ts', {
                  redirectsKey: 'chatPrivacy',
                })
              }
            }}
            testID="ChatMenuPressableStopChat"
          />
        )}
        <ChatMenuItem
          color="warning"
          label="Chat stoppen"
          onPress={() => {
            setIsMenuOpen(false)

            if (ready) {
              void sendMessage(CLOSE_CHAT_MESSAGE)
              void endChat()
            } else {
              close()
            }
          }}
          testID="ChatMenuPressableStopChat"
        />
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
