import {FC} from 'react'
import {
  ConversationEntry,
  ConversationEntryFormat,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatAgentInfo} from '@/modules/chat/components/ChatAgentInfo'
import {EntryChoices} from '@/modules/chat/components/conversation/EntryChoices'
import {EntryRichLink} from '@/modules/chat/components/conversation/EntryRichLink'
import {EntrySelections} from '@/modules/chat/components/conversation/EntrySelections'
import {EntryText} from '@/modules/chat/components/conversation/EntryText'
import {EntryTypingIndicator} from '@/modules/chat/components/conversation/EntryTypingIndicator'

type Props = {
  isLastOfRole: boolean
  message: ConversationEntry
}

const Options: Record<
  ConversationEntryFormat,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: FC<{isLastOfType: boolean; message: any}>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LastComponent?: FC<{isLastOfType: boolean; message: any}>
    agentInfo?: boolean
  }
> = {
  [ConversationEntryFormat.selections]: {
    Component: EntrySelections,
    agentInfo: true,
  },
  [ConversationEntryFormat.text]: {Component: EntryText, agentInfo: true},
  [ConversationEntryFormat.attachments]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.carousel]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.deliveryAcknowledgement]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.imageMessage]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.inputs]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.listPicker]: {
    Component: EntryText,
    LastComponent: EntryChoices,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.participantChanged]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.quickReplies]: {
    Component: EntryText,
    LastComponent: EntryChoices,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.result]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.richLink]: {
    Component: EntryRichLink,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.routingResult]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.routingWorkResult]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.typingStartedIndicator]: {
    Component: EntryTypingIndicator,
    LastComponent: undefined,
    agentInfo: false,
  },
  [ConversationEntryFormat.typingStoppedIndicator]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.unspecified]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.webview]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
}

export const MessageContent = ({message, isLastOfRole}: Props) => {
  const result = Options[message.format]
  const {Component, agentInfo, LastComponent} = result

  if (!result) {
    return null
  }

  return (
    <>
      {!!Component && (
        <Component
          isLastOfType={isLastOfRole}
          message={message}
        />
      )}
      {!!agentInfo && (
        <ChatAgentInfo
          isLastOfType={isLastOfRole}
          message={message}
        />
      )}
      <Gutter height={isLastOfRole ? 'md' : 'sm'} />
      {!!LastComponent && (
        <LastComponent
          isLastOfType={isLastOfRole}
          message={message}
        />
      )}
    </>
  )
}
