import {ReactNode, useContext} from 'react'
import {ConnectionState} from 'react-native-salesforce-messaging-in-app/src/types'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {LoadingDots} from '@/modules/chat/components/LoadingDots'
import {ChatContext} from '@/modules/chat/providers/chat.provider'

type Props = {
  children?: ReactNode
}

export const ChatWaitToStart = ({children}: Props) => {
  const {ready, connectionStatus} = useContext(ChatContext)

  return (
    <>
      {!ready ? (
        <Center grow>
          <Column gutter="sm">
            {connectionStatus !== ConnectionState.closed ? (
              <>
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
              </>
            ) : (
              <>
                <Title
                  level="h4"
                  testID="ChatWaitToStartTitle"
                  text="De chat kon niet geladen worden"
                  textAlign="center"
                />
              </>
            )}
          </Column>
        </Center>
      ) : (
        children
      )}
    </>
  )
}
