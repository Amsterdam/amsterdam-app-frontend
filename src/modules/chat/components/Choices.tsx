import {sendMessage} from 'react-native-salesforce-messaging-in-app/src'
import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {Button} from '@/components/ui/buttons/Button'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'

type Props = {
  choices: ConversationEntry['choices']
}

export const Choices = ({choices}: Props) =>
  choices ? (
    <>
      <Row
        align="end"
        gutter="sm"
        wrap>
        {choices.map(({optionId, title}) => (
          <Button
            key={optionId}
            label={title}
            onPress={() => sendMessage(title)}
            testID={`ChatHistoryChoices${title}`}
            variant="secondary"
          />
        ))}
      </Row>
      <Gutter height="md" />
    </>
  ) : null
