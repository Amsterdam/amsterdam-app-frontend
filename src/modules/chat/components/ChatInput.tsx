import {useCallback, useState} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Pressable, StyleSheet, TextInput, View} from 'react-native'
import {Icon} from '@/components/ui/media/Icon'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const ChatInput = () => {
  const styles = useThemable(createStyles)
  const [input, setInput] = useState('')

  const onChangeText = useCallback((text: string) => {
    setInput(text)
  }, [])

  return (
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
      />
      {input.length > 0 && (
        <View style={styles.buttonWrapper}>
          <View style={styles.spacePlaceholder} />
          <Pressable
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
