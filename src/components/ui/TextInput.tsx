import React from 'react'
import {
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
  View,
} from 'react-native'
import {color, font, size} from '../../tokens'

type clearProps = {
  onClear: () => void
}

export const TextInput = React.forwardRef(
  (props: TextInputRNProps & clearProps, ref: any) => {
    return (
      <View style={styles.searchSection}>
        <TextInputRN ref={ref} {...props} style={styles.textInput} />
      </View>
    )
  },
)

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: size.spacing.xl,
    borderColor: color.border.input,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    padding: size.spacing.sm,
    backgroundColor: color.background.lighter,
    color: color.font.regular,
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
  },
})
