import {useCallback, useRef, useState} from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import {sendTypingEvent} from 'react-native-salesforce-messaging-in-app/src'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {useKeyboardHeight} from '@/hooks/useKeyboardHeight'
import {useToggle} from '@/hooks/useToggle'
import {ChatAttachment} from '@/modules/chat/components/ChatAttachment'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  onSubmit: (message: string) => void
}

export const ChatInput = ({onSubmit}: Props) => {
  const styles = useThemable(createStyles)
  const [input, setInput] = useState('')
  const inputRef = useRef<TextInput | null>(null)
  const {
    toggle: toggleSelectAttachment,
    value: selectAttachment,
    disable: hideSelectAttachment,
  } = useToggle(false)

  const onChangeText = useCallback((text: string) => {
    setInput(text)
    void sendTypingEvent()
  }, [])

  const handleSubmit = useCallback(
    (message: string) => {
      onSubmit(message)
      setInput('')
    },
    [onSubmit],
  )
  const keyboardHeight = useKeyboardHeight()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Box>
        <Row gutter="sm">
          <IconButton
            accessibilityLabel="Terug"
            hitSlop={16}
            icon={
              <Icon
                color="link"
                name={selectAttachment ? 'keyboard' : 'attachment'}
                size="xl"
                testID="HeaderBackIcon"
              />
            }
            onPress={() => {
              toggleSelectAttachment()

              if (selectAttachment) {
                inputRef.current?.focus()
              } else {
                Keyboard.dismiss()
              }
            }}
            testID="HeaderBackButton"
          />
          <View
            style={styles.container}
            testID="ChatTextInputContainer">
            <TextInput
              multiline
              onChangeText={onChangeText}
              onFocus={hideSelectAttachment}
              placeholder="Schrijf uw bericht"
              ref={inputRef}
              style={styles.textInput}
              testID="ChatTextInput"
              value={input}
            />
            {input.length > 0 && (
              <View style={styles.buttonWrapper}>
                <View style={styles.spacePlaceholder} />
                <PressableBase
                  onPress={() => handleSubmit(input)}
                  style={styles.button}
                  testID="ChatTextInputSendButton">
                  <Icon
                    color="inverse"
                    name="chevron-right"
                    testID="ChatTextInputSendButtonIcon"
                  />
                </PressableBase>
              </View>
            )}
          </View>
        </Row>
      </Box>
      {!!selectAttachment && (
        <ChatAttachment
          minHeight={keyboardHeight}
          onSelect={hideSelectAttachment}
        />
      )}
    </KeyboardAvoidingView>
  )
}

const SEND_BUTTON_DIMENSION = 40

const createStyles = ({border, color, text, size}: Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: color.pressable.primary.default.background,
      alignItems: 'center',
      justifyContent: 'center',
      height: SEND_BUTTON_DIMENSION,
      width: SEND_BUTTON_DIMENSION,
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
      flex: 1,
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
