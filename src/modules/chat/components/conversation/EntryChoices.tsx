import {useCallback} from 'react'
import {useSharedValue} from 'react-native-reanimated'
import {sendReply} from 'react-native-salesforce-messaging-in-app/src'
import {
  Choice,
  ConversationEntryQuickReplies,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Button} from '@/components/ui/buttons/Button'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {EntryGutter} from '@/modules/chat/components/conversation/EntryGutter'

type Props = {
  isLastOfRole: boolean
  message: ConversationEntryQuickReplies
}

export const EntryChoices = ({message: {choices}, isLastOfRole}: Props) => {
  const isSent = useSharedValue(false)
  const onPress = useCallback(
    (choice: Choice) => {
      void sendReply(choice).then(() => (isSent.value = true))
    },
    [isSent],
  )

  return choices && !isSent.value ? (
    <>
      <Gutter height="sm" />
      <Row
        align="end"
        gutter="sm"
        wrap>
        {choices.map(({optionId, title, optionValue, parentEntryId}) => (
          <Button
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
      <EntryGutter isLastOfRole={isLastOfRole} />
    </>
  ) : null
}
