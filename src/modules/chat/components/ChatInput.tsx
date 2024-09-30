import {useCallback, useContext, useState} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {ChatContext} from '@/modules/chat/chat.provider'
import {CHAT_TRANSITION_DURATION_SHORT} from '@/modules/chat/constants'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  onSubmit: (message: string) => void
}

export const ChatInput = ({onSubmit}: Props) => {
  const styles = useThemable(createStyles)
  const [input, setInput] = useState('')
  const {isMaximized} = useContext(ChatContext)

  const onChangeText = useCallback((text: string) => {
    setInput(text)
  }, [])

  const handleSubmit = useCallback(
    (message: string) => {
      onSubmit(message)
      setInput('')
    },
    [onSubmit],
  )

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(isMaximized ? 1 : 0, {
      duration: CHAT_TRANSITION_DURATION_SHORT,
    }),
  }))

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View style={animatedStyles}>
        <Box
          insetBottom="md"
          insetHorizontal="md">
          <Column gutter="sm">
            <View
              style={styles.container}
              testID="ChatTextInputContainer">
              <TextInput
                multiline
                onChangeText={onChangeText}
                placeholder="Schrijf uw bericht"
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
          </Column>
        </Box>
      </Animated.View>
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
