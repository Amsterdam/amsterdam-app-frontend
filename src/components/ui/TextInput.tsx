import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {useState} from 'react'
import {
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
  TouchableOpacity,
  View,
} from 'react-native'
import {color, font, size} from '../../tokens'
import {Gutter} from './Gutter'
import {Text} from './Text'

type Props = {
  label?: string
  onChangeText?: (event: string) => void
} & TextInputRNProps

export const TextInput = React.forwardRef((props: Props, ref: any) => {
  const [value, setValue] = useState('')
  const [hasFocus, setFocus] = useState(false)
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
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: size.spacing.xl,
      borderColor: hasFocus ? color.border.inputFocus : color.border.input,
      borderStyle: 'solid',
      borderWidth: hasFocus ? 2 : 1,
    },
    searchIcon: {
      marginRight: 10,
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

  return (
    <View>
      <Text secondary>{props.label}</Text>
      <Gutter height={size.spacing.sm} />
      <View style={styles.searchSection}>
        <TextInputRN
          ref={ref}
          {...props}
          onChangeText={text => handleChangeText(text)}
          onFocus={() => setFocus(true)}
          style={styles.textInput}
          value={props.value ?? value}
        />
        {value ? (
          <TouchableOpacity onPress={handleClearText}>
            <Close
              style={styles.searchIcon}
              width={20}
              height={20}
              fill={'black'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
})
