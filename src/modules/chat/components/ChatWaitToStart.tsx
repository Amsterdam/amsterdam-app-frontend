import {ReactNode, useContext} from 'react'
import {ConnectionState} from 'react-native-salesforce-messaging-in-app/src/types'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {Center} from '@/components/ui/layout/Center'
import {ErrorFigure} from '@/components/ui/media/errors/ErrorFigure'
import {Title} from '@/components/ui/text/Title'
import {LoadingDots} from '@/modules/chat/components/LoadingDots'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {isDevApp} from '@/processes/development'

type Props = {
  children?: ReactNode
}

export const ChatWaitToStart = ({children}: Props) => {
  const {ready, connectionStatus} = useContext(ChatContext)

  return !ready ? (
    connectionStatus !== ConnectionState.closed ? (
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
      <FullScreenError
        backgroundPosition="center"
        Image={ErrorFigure}
        isImageFullSize={false}
        testID="ChatWaitToStartErrorTitle"
        text={
          isDevApp
            ? 'Switchen van omgeving: verander eerst van omgeving en herstart dan de app'
            : 'Probeer het later nog eens.'
        }
        title="De chat kon niet geladen worden"
      />
    )
  ) : (
    children
  )
}
