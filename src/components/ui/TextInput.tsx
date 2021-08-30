import React from 'react'
import {
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
  View,
} from 'react-native'
import {color, font, size} from '../../tokens'
import {Gutter} from './Gutter'
import {Text} from './Text'

type Props = {
  label?: string
  onClear?: () => void
} & TextInputRNProps

export const TextInput = React.forwardRef((props: Props, ref: any) => {
  return (
    <View style={styles.searchSection}>
      <Text secondary>{props.label}</Text>
      <Gutter height={size.spacing.sm} />
      <TextInputRN ref={ref} {...props} style={styles.textInput} />
    </View>
  )
})

const styles = StyleSheet.create({
  searchSection: {},
  textInput: {
    padding: size.spacing.sm,
    backgroundColor: color.background.lighter,
    color: color.font.regular,
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
    borderColor: color.border.input,
    borderStyle: 'solid',
    borderWidth: 1,
    height: size.spacing.xl,
  },
})
