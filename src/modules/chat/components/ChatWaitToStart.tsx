import {ReactNode, useEffect, useState} from 'react'
import {ConnectionState} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {Center} from '@/components/ui/layout/Center'
import {ErrorFigure} from '@/components/ui/media/errors/ErrorFigure'
import {Title} from '@/components/ui/text/Title'
import {ChatAnimatedContentWrapper} from '@/modules/chat/components/ChatAnimatedContentWrapper'
import {LoadingDots} from '@/modules/chat/components/LoadingDots'
import {useChatContext} from '@/modules/chat/providers/chat.context'
import {useChat} from '@/modules/chat/slice'
import {isDevApp} from '@/processes/development'

type Props = {
  children?: ReactNode
}

export const ChatWaitToStart = ({children}: Props) => {
  const [isWaitingTimeExceeded, setIsWaitingTimeExceeded] = useState(false)
  const {ready, connectionStatus} = useChatContext()
  const {close} = useChat()

  useEffect(() => {
    setTimeout(() => {
      setIsWaitingTimeExceeded(true)
    }, 60000)
  }, [])

  return !ready ? (
    connectionStatus !== ConnectionState.closed && !isWaitingTimeExceeded ? (
      <Center grow>
        <LoadingDots
          dotActiveSize={15}
          dotInactiveSize={12}
        />
        <Title
          level="h4"
          testID="ChatWaitToStartTitle"
          text="De chat wordt geladen"
          textAlign="center"
        />
      </Center>
    ) : (
      <ChatAnimatedContentWrapper>
        <FullScreenError
          backgroundPosition="center"
          buttonLabel="Chat sluiten"
          Image={ErrorFigure}
          isImageFullSize={false}
          onPress={close}
          testID="ChatWaitToStartErrorTitle"
          text={
            isDevApp
              ? 'Switchen van omgeving: verander eerst van omgeving en herstart dan de app'
              : 'Probeer het later nog eens.'
          }
          title="De chat kon niet geladen worden"
        />
      </ChatAnimatedContentWrapper>
    )
  ) : (
    children
  )
}
