import {useContext, useMemo} from 'react'
import {Alert} from 'react-native'
import {sendMessage} from 'react-native-salesforce-messaging-in-app/src'
import {PopupMenuItem} from '@/components/ui/menus/types'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {CLOSE_CHAT_MESSAGE} from '@/modules/chat/constants'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {useChat} from '@/modules/chat/slice'
import {downloadChat} from '@/modules/chat/utils/downloadChat'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

export const useChatMenuItems = () => {
  const {setIsMenuOpen, close} = useChat()
  const {addDownloadedTranscriptId, endChat, ready, isEnded} =
    useContext(ChatContext)
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  return useMemo(() => {
    const menuItems: PopupMenuItem[] = []

    menuItems.push({
      color: 'link',
      label: 'Chat downloaden',
      onPress: () => {
        setIsMenuOpen(false)
        void downloadChat().then(
          entryId => entryId && addDownloadedTranscriptId(entryId),
        )
      },
      testID: 'ChatMenuPressableDownloadChatMenuItem',
    })

    if (!isLoading && !isError) {
      menuItems.push({
        color: 'link',
        label: 'Privacy',
        onPress: () => {
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
        },
        testID: 'ChatMenuPressableChatPrivacyMenuItem',
      })
    }

    if (!isEnded) {
      menuItems.push({
        color: 'warning',
        label: 'Chat stoppen',
        onPress: () => {
          setIsMenuOpen(false)

          if (ready) {
            void sendMessage(CLOSE_CHAT_MESSAGE).catch(error =>
              trackException(
                ExceptionLogKey.chatSendMessage,
                'useChatMenuItems.ts',
                {
                  error,
                },
              ),
            )
            endChat()
          } else {
            close()
          }
        },
        testID: 'ChatMenuPressableStopChatMenuItem',
      })
    }

    return menuItems
  }, [
    addDownloadedTranscriptId,
    close,
    endChat,
    isEnded,
    isError,
    isLoading,
    openWebUrl,
    ready,
    redirectUrls?.chatPrivacy,
    setIsMenuOpen,
    trackException,
  ])
}
