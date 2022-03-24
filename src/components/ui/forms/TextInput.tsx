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

export const TextInput = forwardRef((props: Props, ref: any) => {
  const [hasFocus, setFocus] = useState(false)
  const [value, setValue] = useState('')

  const {onChangeText} = props

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
    props.onFocus && props.onFocus()
  }

  const dynamicStyles = StyleSheet.create({
    searchSection: {
      borderColor: hasFocus
        ? color.control.focus.border
        : color.control.default.border,
      borderWidth: hasFocus ? 2 : 1,
    },
    textInput: {
      minHeight:
        Platform.OS === 'ios' && props.numberOfLines
          ? props.numberOfLines * textLineHeight + 2 * inputPadding
          : 'auto',
    },
  })

  return (
    <Column gutter="sm">
      <Label isAccessible={!props.accessibilityLabel} text={props.label} />
      <View
        style={[
          styles.searchSection,
          dynamicStyles.searchSection,
          props.warning && styles.warning,
        ]}>
        <TextInputRN
          {...props}
          onBlur={handleBlur}
          onChangeText={text => handleChangeText(text)}
          onFocus={handleFocus}
          numberOfLines={
            Platform.OS === 'ios' ? undefined : props.numberOfLines
          }
          ref={ref}
          style={[styles.textInput, dynamicStyles.textInput]}
          value={props.value ?? value}
        />
        {value ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityHint="Verwijder uw invoertekst"
            onPress={handleClearText}
            style={styles.clearButton}>
            <Close fill={color.font.regular} height={20} width={20} />
          </TouchableOpacity>
        ) : null}
      </View>
    </Column>
  )
})

const styles = StyleSheet.create({
  clearButton: {
    alignSelf: 'stretch',
    padding: inputPadding,
  },
  searchSection: {
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
  warning: {
    borderColor: color.border.invalid,
    borderWidth: 2,
  },
})
