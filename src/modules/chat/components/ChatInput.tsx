import {useCallback, useState} from 'react'

import {
  KeyboardAvoidingView,
  Platform,
  // eslint-disable-next-line no-restricted-imports
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {DevelopmentButtons} from '@/modules/chat/components/DevelopmentButtons'
import {ChatMessageAgent, ChatMessageBase} from '@/modules/chat/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  clearMessages: () => void
  onSubmit: (message: ChatMessageBase) => void
}

export const ChatInput = ({clearMessages, onSubmit}: Props) => {
  const styles = useThemable(createStyles)
  const [input, setInput] = useState('')

  const onChangeText = useCallback((text: string) => {
    setInput(text)
  }, [])

  const handleSubmit = useCallback(
    (message: ChatMessageBase) => {
      onSubmit(message)
      setInput('')
    },
    [onSubmit],
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Column gutter="sm">
        <View
          style={styles.container}
          testID="ChatTextInputContainer">
          <TextInput
            autoFocus
            multiline
            onChangeText={onChangeText}
            placeholder="Type uw bericht"
            style={styles.textInput}
            testID="ChatTextInput"
            value={input}
          />
          {input.length > 0 && (
            <View style={styles.buttonWrapper}>
              <View style={styles.spacePlaceholder} />
              <Pressable
                onPress={() =>
                  handleSubmit({
                    agent: ChatMessageAgent.user,
                    text: input,
                  })
                }
                style={styles.button}
                testID="ChatTextInputSendButton">
                <Icon
                  color="inverse"
                  name="chevron-right"
                  testID="ChatTextInputSendButtonIcon"
                />
              </Pressable>
            </View>
          )}
        </View>
        <DevelopmentButtons
          addMessage={onSubmit}
          clearMessages={clearMessages}
        />
      </Column>
    </KeyboardAvoidingView>
  )
}

const BUTTON_DIMENSION = 40

const createStyles = ({border, color, text, size}: Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: color.pressable.primary.default.background,
      alignItems: 'center',
      justifyContent: 'center',
      height: BUTTON_DIMENSION,
      width: BUTTON_DIMENSION,
    },
    buttonWrapper: {
      height: '100%',
    },
    spacePlaceholder: {
      flexGrow: 1,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: border.width.sm,
      padding: size.spacing.xs,
      columnGap: size.spacing.sm,
    },
    textInput: {
      flex: 1,
      color: color.text.default,
      fontFamily: text.fontFamily.regular,
      fontSize: text.fontSize.body,
      padding: 0, // Override an Android default
      paddingLeft: size.spacing.md,
      paddingTop: size.spacing.sm,
      paddingBottom: size.spacing.sm,
    },
  })
