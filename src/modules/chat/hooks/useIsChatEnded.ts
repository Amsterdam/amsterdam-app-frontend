import {useState, useEffect} from 'react'
import {
  ConversationEntry,
  ConversationEntryFormat,
  ConversationEntryRoutingWorkType,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {useBoolean} from '@/hooks/useBoolean'

/**
 * Function to check if the chat is ended or not
 * How it works:
 * It checks whether the last received message (excluding Transcript entries) is of format RoutingWorkResult
 * If that is the case, and the workType is 'closed' and we are not waiting for an agent, then the chat is ended
 *
 * If above condition is false, it will check whether an agent was in the chat and has since left and no agents remain.
 *
 * This function should preferably be replaced by a reliable isEnded value that is provided by Salesforce
 */
const isChatEnded = (
  messages: ConversationEntry[],
  isWaitingForAgent: boolean,
  agentEnteredChat: boolean,
  agentInChat: boolean,
): boolean => {
  const filteredMessages = messages.filter(
    message => message.format !== ConversationEntryFormat.transcript,
  )
  const lastMessage = filteredMessages[filteredMessages.length - 1]

  return (
    (lastMessage?.format === ConversationEntryFormat.routingWorkResult &&
      lastMessage.workType === ConversationEntryRoutingWorkType.closed &&
      !isWaitingForAgent) ||
    (agentEnteredChat && !agentInChat)
  )
}

export const useIsChatEnded = (
  messages: ConversationEntry[],
  isWaitingForAgent: boolean,
  agentInChat: boolean,
): {endChat: () => void; isEnded: boolean} => {
  const {value: isEnded, enable: endChat} = useBoolean(false)
  const [agentEnteredChat, setAgentEnteredChat] = useState(agentInChat)

  useEffect(() => {
    if (agentInChat) {
      setAgentEnteredChat(true)
    }
  }, [agentInChat])

  return {
    isEnded:
      isEnded ||
      isChatEnded(messages, isWaitingForAgent, agentEnteredChat, agentInChat),
    endChat,
  }
}
