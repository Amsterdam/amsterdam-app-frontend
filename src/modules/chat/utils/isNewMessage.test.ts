import {ConversationEntryFormat} from 'react-native-salesforce-messaging-in-app/src/types'
import {isNewMessage} from '@/modules/chat/utils/isNewMessage'

describe('isNewMessage', () => {
  it('should return true for attachments format', () => {
    expect(isNewMessage(ConversationEntryFormat.attachments)).toBe(true)
  })

  it('should return true for carousel format', () => {
    expect(isNewMessage(ConversationEntryFormat.carousel)).toBe(true)
  })

  it('should return true for imageMessage format', () => {
    expect(isNewMessage(ConversationEntryFormat.imageMessage)).toBe(true)
  })

  it('should return true for inputs format', () => {
    expect(isNewMessage(ConversationEntryFormat.inputs)).toBe(true)
  })

  it('should return true for listPicker format', () => {
    expect(isNewMessage(ConversationEntryFormat.listPicker)).toBe(true)
  })

  it('should return true for richLink format', () => {
    expect(isNewMessage(ConversationEntryFormat.richLink)).toBe(true)
  })

  it('should return true for quickReplies format', () => {
    expect(isNewMessage(ConversationEntryFormat.quickReplies)).toBe(true)
  })

  it('should return true for selections format', () => {
    expect(isNewMessage(ConversationEntryFormat.selections)).toBe(true)
  })

  it('should return true for text format', () => {
    expect(isNewMessage(ConversationEntryFormat.text)).toBe(true)
  })

  it('should return false for unspecified format', () => {
    expect(isNewMessage(ConversationEntryFormat.unspecified)).toBe(false)
  })

  it('should return false for webview format', () => {
    expect(isNewMessage(ConversationEntryFormat.webview)).toBe(false)
  })

  it('should return false for typingStartedIndicator format', () => {
    expect(isNewMessage(ConversationEntryFormat.typingStartedIndicator)).toBe(
      false,
    )
  })

  it('should return false for typingStoppedIndicator format', () => {
    expect(isNewMessage(ConversationEntryFormat.typingStoppedIndicator)).toBe(
      false,
    )
  })
})
