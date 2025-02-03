import {useCallback, useState} from 'react'
import {sendReply} from 'react-native-salesforce-messaging-in-app/src'
import {
  Choice,
  ConversationEntryQuickReplies,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {Button} from '@/components/ui/buttons/Button'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

type Props = {
  isLastOfGroup: boolean
  message: ConversationEntryQuickReplies
}

export const EntryChoices = ({message: {choices}, isLastOfGroup}: Props) => {
  const trackException = useTrackException()
  const [isSent, setIsSent] = useState(false)
  const onPress = useCallback(
    (choice: Choice) => {
      sendReply(choice)
        .then(() => setIsSent(true))
        .catch(error =>
          trackException(ExceptionLogKey.chatSendReply, 'EntryChoices.tsx', {
            error,
          }),
        )
    },
    [trackException],
  )

  return choices && !isSent ? (
    <>
      <Gutter height="sm" />
      <Row
        align="end"
        gutter="sm"
        wrap>
        {choices.map(({optionId, title, optionValue, parentEntryId}) => (
          <Button
            accessibilityLabel={`Keuzeknop: ${title}`}
            key={optionId}
            label={title}
            onPress={() =>
              onPress({optionId, title, optionValue, parentEntryId})
            }
            testID={`ChatHistoryChoices${title}`}
            variant="secondary"
          />
        ))}
      </Row>
      <EntryGutter isLastOfGroup={isLastOfGroup} />
    </>
  ) : null
}
