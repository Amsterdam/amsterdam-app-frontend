import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {useState} from 'react'
import {
  Platform,
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
  TouchableOpacity,
  View,
} from 'react-native'
import {color, font, size} from '../../tokens'
import {Gutter} from './layout'
import {Label} from './'

type Props = {
  label: string
  numberOfLines?: number
  onChangeText?: (event: string) => void
  onFocus?: () => void
  warning?: boolean
} & TextInputRNProps

const textLineHeight = font.height.p1
const inputPadding = size.spacing.sm

export const TextInput = React.forwardRef((props: Props, ref: any) => {
  const [hasFocus, setFocus] = useState(false)
  const [value, setValue] = useState('')

  const {onChangeText} = props

  const handleChangeText = (text: string) => {
    setValue(text)
    onChangeText && onChangeText(text)
  }

  const handleClearText = () => {
    setValue('')
    onChangeText && onChangeText('')
  }

  const styles = StyleSheet.create({
    clearButton: {
      alignSelf: 'stretch',
      padding: inputPadding,
    },
    searchSection: {
      flexDirection: 'row',
      backgroundColor: color.background.white,
      borderColor: hasFocus ? color.border.inputFocus : color.border.input,
      borderStyle: 'solid',
      borderWidth: hasFocus ? 2 : 1,
    },
    textInput: {
      flex: 1,
      padding: inputPadding,
      color: color.font.regular,
      fontFamily: font.weight.regular,
      fontSize: font.size.p1,
      lineHeight: textLineHeight,
      minHeight:
        Platform.OS === 'ios' && props.numberOfLines
          ? props.numberOfLines * textLineHeight + 2 * inputPadding
          : 'auto',
    },
    warning: {
      borderColor: color.border.invalid,
      borderWidth: 2,
    },
  })

  return (
    <View>
      <Label isAccessible={!props.accessibilityLabel} text={props.label} />
      <Gutter height={size.spacing.sm} />
      <View style={[styles.searchSection, props.warning && styles.warning]}>
        <TextInputRN
          {...props}
          onBlur={() => setFocus(false)}
          onChangeText={text => handleChangeText(text)}
          onFocus={props.onFocus ? props.onFocus : () => setFocus(true)}
          numberOfLines={
            Platform.OS === 'ios' ? undefined : props.numberOfLines
          }
          ref={ref}
          style={styles.textInput}
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
    </View>
  )
})
