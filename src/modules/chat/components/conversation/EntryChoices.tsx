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

type Props = {
  isLastOfGroup: boolean
  message: ConversationEntryQuickReplies
}

export const EntryChoices = ({message: {choices}, isLastOfGroup}: Props) => {
  const [isSent, setIsSent] = useState(false)
  const onPress = useCallback((choice: Choice) => {
    void sendReply(choice).then(() => setIsSent(true))
  }, [])

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
