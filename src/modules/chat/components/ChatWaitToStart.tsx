import {ReactNode, useContext} from 'react'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {LoadingDots} from '@/modules/chat/components/LoadingDots'
import {ChatContext} from '@/modules/chat/providers/chat.provider'

type Props = {
  children?: ReactNode
}

export const ChatWaitToStart = ({children}: Props) => {
  const {ready} = useContext(ChatContext)

  return (
    <>
      {!ready ? (
        <Center grow>
          <Column gutter="sm">
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
          </Column>
        </Center>
      ) : (
        children
      )}
    </>
  )
}
