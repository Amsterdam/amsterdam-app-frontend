import {View, StyleSheet} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {AvatarBot} from '@/modules/chat/assets/AvatarBot'
import {AvatarEmployee} from '@/modules/chat/assets/AvatarEmployee'
import {ChatMessageLoading} from '@/modules/chat/components/ChatMessageLoading'
import {ChatMessageAgent, ChatMessageBase} from '@/modules/chat/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  message: ChatMessageBase
}

export const ChatMessage = ({message}: Props) => {
  const styles = useThemable(theme => createStyles(theme, message.agent))
  const isUser = message.agent === ChatMessageAgent.user
  const isLoading = false

  return (
    <Row
      align={isUser ? 'end' : 'start'}
      gutter="sm"
      valign="end">
      {!isLoading && message.agent === ChatMessageAgent.bot && <AvatarBot />}
      {!isLoading && message.agent === ChatMessageAgent.employee && (
        <AvatarEmployee />
      )}
      <View style={styles.textContainer}>
        {isLoading ? (
          <ChatMessageLoading />
        ) : (
          <Phrase
            color={
              message.agent === ChatMessageAgent.user ? 'inverse' : undefined
            }
            testID="">
            {message.text}
          </Phrase>
        )}
      </View>
    </Row>
  )
}

const createStyles = ({color, size}: Theme, agent: ChatMessageAgent) => {
  const isUser = agent === ChatMessageAgent.user
  const borderRadius = 12

  return StyleSheet.create({
    textContainer: {
      flexShrink: 1,
      backgroundColor: color.chat.message.background[agent],
      padding: size.spacing.md,
      borderRadius: borderRadius,
      borderBottomRightRadius: isUser ? 0 : borderRadius,
      borderBottomLeftRadius: isUser ? borderRadius : 0,
    },
  })
}
