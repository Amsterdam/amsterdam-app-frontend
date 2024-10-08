import {useCallback} from 'react'
import {useSharedValue} from 'react-native-reanimated'
import {sendMessage} from 'react-native-salesforce-messaging-in-app/src'
import {ConversationEntryQuickReplies} from 'react-native-salesforce-messaging-in-app/src/types'
import {Button} from '@/components/ui/buttons/Button'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'

type Props = {
  choices: ConversationEntryQuickReplies['choices']
}

export const Choices = ({choices}: Props) => {
  const isSent = useSharedValue(false)
  const onPress = useCallback(
    (title: string) => {
      void sendMessage(title).then(() => (isSent.value = true))
    },
    [isSent],
  )

  return choices && !isSent.value ? (
    <>
      <Row
        align="end"
        gutter="sm"
        wrap>
        {choices.map(({optionId, title}) => (
          <Button
            key={optionId}
            label={title}
            onPress={() => onPress(title)}
            testID={`ChatHistoryChoices${title}`}
            variant="secondary"
          />
        ))}
      </Row>
      <Gutter height="md" />
    </>
  ) : null
}
