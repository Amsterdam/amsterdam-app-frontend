import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {forwardRef, useState} from 'react'
import {
  Platform,
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
  TouchableOpacity,
  View,
} from 'react-native'
import {color, font, size} from '../../../tokens'
import {allInsets} from '../../../utils'
import {Label} from '../index'
import {Column} from '../layout'

type Props = {
  label: string
  numberOfLines?: number
  onChangeText?: (event: string) => void
  onFocus?: () => void
  warning?: boolean
} & TextInputRNProps

const textLineHeight = font.height.p1
const inputPadding = size.spacing.sm

export const TextInput = forwardRef(
  (
    {
      label,
      numberOfLines,
      onChangeText,
      onFocus,
      warning,
      ...otherProps
    }: Props,
    ref: any,
  ) => {
    const [hasFocus, setFocus] = useState(false)
    const [value, setValue] = useState('')

    const handleBlur = () => setFocus(false)

    const handleChangeText = (text: string) => {
      setValue(text)
      onChangeText && onChangeText(text)
    }

    const handleClearText = () => {
      setValue('')
      onChangeText && onChangeText('')
    }

    const handleFocus = () => {
      setFocus(true)
      onFocus && onFocus()
    }

    const dynamicStyles = StyleSheet.create({
      frame: {
        borderColor: warning
          ? color.control.warning.border
          : hasFocus
          ? color.control.focus.border
          : color.control.default.border,
        borderWidth: hasFocus || warning ? 2 : 1,
      },
      textInput: {
        minHeight:
          Platform.OS === 'ios' && numberOfLines
            ? numberOfLines * textLineHeight + 2 * inputPadding
            : 'auto',
      },
    })

    return (
      <Column gutter="sm">
        <Label isAccessible={!otherProps.accessibilityLabel} text={label} />
        <View style={[styles.frame, dynamicStyles.frame]}>
          <TextInputRN
            {...otherProps}
            onBlur={handleBlur}
            onChangeText={text => handleChangeText(text)}
            onFocus={handleFocus}
            numberOfLines={Platform.OS === 'ios' ? undefined : numberOfLines}
            ref={ref}
            style={[styles.textInput, dynamicStyles.textInput]}
            value={value}
          />
          {value ? (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityHint="Verwijder uw invoertekst"
              hitSlop={allInsets(size.spacing.sm)}
              onPress={handleClearText}
              style={styles.clearButton}>
              <Close fill={color.font.regular} height={20} width={20} />
            </TouchableOpacity>
          ) : null}
        </View>
      </Column>
    )
  },
)

const styles = StyleSheet.create({
  clearButton: {
    alignSelf: 'stretch',
    padding: inputPadding,
  },
  frame: {
    flexDirection: 'row',
    backgroundColor: color.background.white,
    borderStyle: 'solid',
  },
  textInput: {
    flex: 1,
    padding: inputPadding,
    color: color.font.regular,
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: textLineHeight,
  },
})
