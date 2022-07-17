import React, {forwardRef, useState} from 'react'
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native'
import {IconButton} from '@/components/ui/buttons'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

type Props = {
  onChangeText?: (event: string) => void
  onFocus?: () => void
} & TextInputProps

export const SearchField = forwardRef<TextInput, Props>(
  ({onChangeText, onFocus, value = '', ...otherProps}: Props, ref) => {
    const [hasFocus, setHasFocus] = useState(false)

    const styles = useThemable(createStyles({hasFocus}))
    const textInputProps = useThemable(createTextInputProps)

    const handleBlur = () => setHasFocus(false)

    const handleChangeText = (text: string) => {
      onChangeText?.(text)
    }

    const handleClearText = () => {
      onChangeText?.('')
    }

    const handleFocus = () => {
      setHasFocus(true)
      onFocus?.()
    }

    return (
      <View style={styles.frame}>
        <TextInput
          {...otherProps}
          {...textInputProps}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          ref={ref}
          style={styles.textInput}
          textAlignVertical="top"
          value={value}
        />
        {value ? (
          <IconButton
            accessibilityHint="Maak dit zoekveld leeg"
            icon={<Icon name="close" />}
            onPress={handleClearText}
          />
        ) : (
          <Icon name="search" size={24} />
        )}
      </View>
    )
  },
)

const borderWidth = (focus: boolean) => (focus ? 2 : 1)

const createStyles =
  ({hasFocus: hasFocus}: {hasFocus: boolean} & Partial<Props>) =>
  ({color, size, text}: Theme) => {
    return StyleSheet.create({
      frame: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: size.spacing.sm,
        paddingBottom:
          size.spacing.sm +
          (hasFocus ? borderWidth(false) - borderWidth(true) : 0),
        paddingHorizontal: size.spacing.md,
        backgroundColor: color.box.background.white,
        borderBottomStyle: 'solid',
        borderBottomColor: hasFocus
          ? color.control.focus.border
          : color.control.default.border,
        borderBottomWidth: borderWidth(hasFocus),
      },
      textInput: {
        flex: 1,
        padding: 0, // Override an Android default
        color: color.text.default,
        fontFamily: text.fontWeight.regular,
        fontSize: text.fontSize.body,
        lineHeight: text.fontSize.body * text.lineHeight.input,
      },
    })
  }

const createTextInputProps = ({color}: Theme): TextInputProps => ({
  placeholderTextColor: color.text.secondary,
})
