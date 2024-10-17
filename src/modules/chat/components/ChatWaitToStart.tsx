import {ReactNode, useContext, useEffect, useState} from 'react'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ChatMessageTypingIndicator} from '@/modules/chat/components/ChatMessageTypingIndicator'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {sleep} from '@/utils/sleep'

const SHOW_DELAY = 1000

type Props = {
  children?: ReactNode
}

export const ChatWaitToStart = ({children}: Props) => {
  const {ready} = useContext(ChatContext)
  const [shouldShowWaiting, setShouldShowWaiting] = useState(false)

  useEffect(() => {
    void sleep(SHOW_DELAY).then(() => {
      setShouldShowWaiting(true)
    })
  }, [])

  return (
    <>
      {shouldShowWaiting && !ready ? (
        <Center grow>
          <Column gutter="sm">
            <ChatMessageTypingIndicator
              dotActiveSize={15}
              dotInactiveSize={12}
            />
            <Title
              level={'h4'}
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
