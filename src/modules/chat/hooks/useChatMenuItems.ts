import {useMemo} from 'react'
import {Alert} from 'react-native'
import {endConversation} from 'react-native-salesforce-messaging-in-app/src'
import {PopupMenuItem} from '@/components/ui/menus/types'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useChatContext} from '@/modules/chat/providers/chat.context'
import {useChat} from '@/modules/chat/slice'
import {downloadChat} from '@/modules/chat/utils/downloadChat'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useMenu} from '@/store/slices/menu'

export const useChatMenuItems = () => {
  const {close} = useChat()
  const {close: closeMenu} = useMenu()
  const {addDownloadedTranscriptId, ready, isEnded} = useChatContext()
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  return useMemo(() => {
    const menuItems: PopupMenuItem[] = []

    menuItems.push({
      color: 'link',
      label: 'Chat downloaden',
      onPress: () => {
        closeMenu()
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
            closeMenu()
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
          closeMenu()

          if (ready) {
            void endConversation().catch(error =>
              trackException(
                ExceptionLogKey.chatSendMessage,
                'useChatMenuItems.ts',
                {
                  error,
                },
              ),
            )
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
    closeMenu,
    isEnded,
    isError,
    isLoading,
    openWebUrl,
    ready,
    redirectUrls?.chatPrivacy,
    trackException,
  ])
}
