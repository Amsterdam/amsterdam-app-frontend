import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {ChatMessageAgent, ChatMessageBase} from '@/modules/chat/types'

const RANDOM_MESSAGES = {
  BOT: [
    'Hallo ik ben de chatbot van de gemeente Amsterdam.',
    'Wat kan ik voor u doen?',
    'Om te weten waarnaar ik u naartoe moet verwijzen, woont u in Amsterdam of Weesp?',
    'Ik breng u in contact met een medewerker die u verder helpt.',
    'Wat is uw voornaam?',
  ],
  EMPLOYEE: [
    'Hallo Kevin, ik ben Jasmijn van de Gemeente Amsterdam.',
    'Wat voor vraag heeft u over het aanvragen van een rijbewijs?',
  ],
}

const getRandomMessage = (agent: ChatMessageAgent) =>
  agent === ChatMessageAgent.bot
    ? RANDOM_MESSAGES.BOT[
        Math.floor(Math.random() * RANDOM_MESSAGES.BOT.length)
      ]
    : RANDOM_MESSAGES.EMPLOYEE[
        Math.floor(Math.random() * RANDOM_MESSAGES.EMPLOYEE.length)
      ]

type Props = {
  addMessage: (message: ChatMessageBase) => void
  clearMessages: () => void
}

/**
 * Helps with development. Remove once the chat is fully functional.
 */
export const DevelopmentButtons = ({addMessage, clearMessages}: Props) => (
  <Row
    gutter="sm"
    wrap>
    <Button
      label="Bot"
      onPress={() =>
        addMessage({
          agent: ChatMessageAgent.bot,
          text: getRandomMessage(ChatMessageAgent.bot),
        })
      }
      testID="irrelevant"
    />
    <Button
      label="Medewerker"
      onPress={() =>
        addMessage({
          agent: ChatMessageAgent.employee,
          text: getRandomMessage(ChatMessageAgent.employee),
        })
      }
      testID="irrelevant"
    />
    <Button
      label="Maak leeg"
      onPress={clearMessages}
      testID="irrelevant"
    />
  </Row>
)
