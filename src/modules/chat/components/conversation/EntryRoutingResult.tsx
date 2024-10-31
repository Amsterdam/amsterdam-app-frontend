import {useContext} from 'react'
import {
  ConversationEntryRoutingResult,
  ConversationEntryRoutingType,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {LoadingDots} from '@/modules/chat/components/LoadingDots'
import {ChatContext} from '@/modules/chat/providers/chat.provider'
import {getWaitingTimePhrase} from '@/modules/chat/utils/getWaitingTimePhrase'

type Props = {
  message: ConversationEntryRoutingResult
}

export const EntryRoutingResult = ({
  message: {isEWTAvailable, estimatedWaitTime, routingType},
}: Props) => {
  const {waitingForAgent} = useContext(ChatContext)

  if (
    routingType !== ConversationEntryRoutingType.transfer ||
    !waitingForAgent
  ) {
    return null
  }

  return (
    <Column
      gutter="sm"
      halign="center">
      <LoadingDots
        dotActiveSize={15}
        dotInactiveSize={12}
      />
      <Phrase
        emphasis="strong"
        testID="ChatEntryRoutingResultPhrase">
        Een medewerker neem het gesprek over.
      </Phrase>
      {!!isEWTAvailable && (
        <Phrase testID="ChatEntryRoutingResultEstimatedWaitingTimePhrase">
          Geschatte wachttijd: {getWaitingTimePhrase(estimatedWaitTime)}
        </Phrase>
      )}
    </Column>
  )
}
