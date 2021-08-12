import React from 'react'
import {
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
} from 'react-native'
import {color, font} from '../../tokens'

export const TextInput = (props: TextInputRNProps) => (
  <TextInputRN {...props} style={styles.textInput} />
)

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: color.background.lighter,
    borderColor: color.border.input,
    borderStyle: 'solid',
    borderWidth: 1,
    color: color.font.regular,
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
  },
})
