import {ConversationEntry} from 'react-native-salesforce-messaging-in-app/src/types'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  firstMessage: ConversationEntry
}

export const ChatStartTime = ({firstMessage}: Props) => (
  <Row
    align="center"
    gutter="sm"
    valign="center">
    <Icon
      color="secondary"
      name="chat"
      testID="ChatStartingTimeIcon"
    />
    <Phrase
      color="secondary"
      testID="ChatStartingTime">{`Chat gestart om ${dayjs(firstMessage?.timestamp).format('HH:mm')}`}</Phrase>
  </Row>
)
