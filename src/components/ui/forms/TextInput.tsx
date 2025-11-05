import {createRef, type RefObject, useEffect, useState} from 'react'
import {
  Platform,
  StyleSheet,
  type TextInputProps as TextInputPropsRN,
  View,
} from 'react-native'
import {TextInput as TextInputRN} from 'react-native-gesture-handler'
import {useIsInBottomSheet} from '@/components/features/bottom-sheet/BottomSheetPresenceContext'
import {BottomSheetTextInput} from '@/components/features/bottom-sheet/BottomSheetTextInput'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Label} from '@/components/ui/forms/Label'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export type TextInputSharedProps = {
  hasClearButton?: boolean
  inputInstructions?: string
  label?: string
  numberOfLines?: number
  placeholder?: string
  textTransform?: (text: string) => string
}

export type TextInputProps = {
  onChangeText?: (event: string) => void
  onFocus?: () => void
  ref?: RefObject<TextInputRN | null>
  warning?: boolean
} & TextInputSharedProps &
  TextInputPropsRN

export const TextInput = ({
  ref,
  hasClearButton = true,
  inputInstructions,
  label,
  numberOfLines,
  onChangeText,
  onFocus,
  placeholder = '',
  warning,
  value: valueProp = '',
  testID = '',
  textTransform,
  accessibilityLanguage = 'nl-NL',
  ...textInputProps
}: TextInputProps) => {
  const isInBottomSheet = useIsInBottomSheet()
  const inputRef = createRef<TextInputRN>()
  const [hasFocus, setHasFocus] = useState(false)
  const [value, setValue] = useState(valueProp)

  const styles = useThemable(createStyles({hasFocus, numberOfLines, warning}))
  const themedTextInputProps = useThemable(createTextInputProps)

  const InputComponent = isInBottomSheet ? BottomSheetTextInput : TextInputRN

  useEffect(() => {
    setValue(valueProp)
  }, [valueProp])

  const handleBlur = () => setHasFocus(false)

  const handleChangeText = (textValue: string) => {
    const text = textTransform ? textTransform(textValue) : textValue

    setValue(text)
    onChangeText?.(text)
  }

  const handleClearText = () => {
    setValue('')
    onChangeText?.('')

    if (typeof ref !== 'function') {
      ;(ref?.current ?? inputRef?.current)?.focus?.()
      handleFocus()
    }
  }

  const handleFocus = () => {
    setHasFocus(true)
    onFocus?.()
  }

  return (
    <Column gutter="sm">
      <Column gutter="xs">
        {!!label && (
          <Label
            isAccessible={!textInputProps.accessibilityLabel}
            text={label}
          />
        )}
        {!!inputInstructions && (
          <Label
            emphasis="default"
            isAccessible={!textInputProps.accessibilityHint}
            text={inputInstructions}
          />
        )}
      </Column>
      <View style={styles.frame}>
        <InputComponent
          {...textInputProps}
          {...themedTextInputProps}
          accessibilityLanguage={accessibilityLanguage}
          numberOfLines={Platform.OS === 'ios' ? undefined : numberOfLines}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          placeholder={placeholder}
          ref={ref ?? inputRef}
          style={styles.textInput}
          testID={testID}
          textAlignVertical="top"
          value={value}
        />
        {value && hasClearButton ? (
          <View>
            <IconButton
              accessibilityHint="Maak dit tekstveld leeg"
              accessibilityLanguage={accessibilityLanguage}
              icon={
                <Icon
                  name="close"
                  size="lg"
                  testID={`${testID}ClearIcon`}
                />
              }
              onPress={handleClearText}
              testID={`${testID}ClearButton`}
            />
          </View>
        ) : null}
      </View>
    </Column>
  )
}

const createStyles =
  ({
    hasFocus,
    numberOfLines,
    warning,
  }: {hasFocus: boolean} & Partial<TextInputProps>) =>
  ({color, size, text}: Theme) => {
    const borderWidth = hasFocus || warning ? 2 : 1
    const paddingHorizontal = size.spacing.md - (borderWidth - 1)
    const paddingVertical = size.spacing.sm - (borderWidth - 1)

    return StyleSheet.create({
      frame: {
        flexDirection: 'row',
        paddingHorizontal,
        paddingVertical,
        backgroundColor: color.textInput.container.background,
        borderStyle: 'solid',
        borderColor: warning
          ? color.control.warning.border
          : hasFocus
            ? color.control.focus.border
            : color.control.default.border,
        borderWidth,
      },
      textInput: {
        minHeight: numberOfLines
          ? numberOfLines * text.lineHeight.body + 2 * paddingVertical
          : 'auto',
        flex: 1,
        padding: 0, // Override an Android default
        paddingTop: 0,
        color: color.text.default,
        fontFamily: text.fontFamily.regular,
        fontSize: text.fontSize.body,
      },
    })
  }

const createTextInputProps = ({color}: Theme): TextInputProps => ({
  placeholderTextColor: color.text.secondary,
})
