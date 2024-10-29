import {FC} from 'react'
import Animated, {SlideInDown} from 'react-native-reanimated'
import {
  ConversationEntry,
  ConversationEntryFormat,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ChatAgentInfo} from '@/modules/chat/components/ChatAgentInfo'
import {EntryAttachments} from '@/modules/chat/components/conversation/EntryAttachments'
import {EntryChoices} from '@/modules/chat/components/conversation/EntryChoices'
import {EntryRichLink} from '@/modules/chat/components/conversation/EntryRichLink'
import {EntrySelections} from '@/modules/chat/components/conversation/EntrySelections'
import {EntryText} from '@/modules/chat/components/conversation/EntryText'
import {EntryTypingIndicator} from '@/modules/chat/components/conversation/EntryTypingIndicator'

type Props = {
  isLastOfRole: boolean
  message: ConversationEntry
}

const options: Record<
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
    Component: EntryAttachments,
    LastComponent: undefined,
    agentInfo: false,
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
    agentInfo: true,
  },
  [ConversationEntryFormat.participantChanged]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.quickReplies]: {
    Component: EntryText,
    LastComponent: EntryChoices,
    agentInfo: true,
  },
  [ConversationEntryFormat.result]: {
    Component: undefined,
    LastComponent: undefined,
    agentInfo: undefined,
  },
  [ConversationEntryFormat.richLink]: {
    Component: EntryRichLink,
    agentInfo: true,
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

export const Entry = ({message, isLastOfRole}: Props) => {
  const result = options[message.format]

  if (!result) {
    return null
  }

  const {Component, agentInfo, LastComponent} = result

  return (
    <Animated.View entering={SlideInDown}>
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
    </Animated.View>
  )
}
